import { useState, useRef, ChangeEvent, useEffect } from "react";
import ReactCrop, { type Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";
import { centerAspectCrop, canvasPreview } from "../../utils/canvas";
import RangeInput from "../form/RangeInput";
import ProfileImage from "../ui/ProfileImage";

interface ProfileImageUploadProps {
  label: string;
  aspect: number;
  initialImageUrl?: string | null;
  onImageChange: (imageBlob: Blob | null) => void;
}

const ImageInput = ({
  label,
  aspect,
  initialImageUrl,
  onImageChange,
}: ProfileImageUploadProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [latestBlob, setLatestBlob] = useState<Blob | null>(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }

      setCrop(null);
      setCompletedCrop(null);
      setCroppedImageUrl(null);
      setLatestBlob(null);
      setScale(1);
      setRotate(0);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const { width, height } = e.currentTarget;
    imgRef.current = e.currentTarget;
    const newCrop = centerAspectCrop(width, height, aspect);
    setCrop(newCrop);
  };

  const confirmCrop = async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blob) {
      const newCroppedImageUrl = URL.createObjectURL(blob);
      setCroppedImageUrl(newCroppedImageUrl);
      setImgSrc(newCroppedImageUrl);
      onImageChange(blob);
    } else {
      console.error("Failed to create blob from cropped image");
    }
  };

  useDebounceEffect(
    () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );

        previewCanvasRef.current.toBlob((blob) => {
          if (blob) {
            setLatestBlob(blob);
          } else {
            setLatestBlob(null);
            console.error("Failed to create blob from preview canvas");
          }
        }, "image/png");
      } else {
        setLatestBlob(null);
      }
    },
    100,
    [completedCrop, scale, rotate, onImageChange],
  );

  const cancelCrop = () => {
    if (croppedImageUrl) {
      setImgSrc(croppedImageUrl);
    } else if (initialImageUrl) {
      setImgSrc(initialImageUrl);
      setCroppedImageUrl(initialImageUrl);
    } else {
      setImgSrc("");
    }

    setCrop(null);
    setCompletedCrop(null);
    setLatestBlob(null);
    setScale(1);
    setRotate(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (initialImageUrl) {
      setImgSrc(initialImageUrl);
      setCroppedImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">{label}</legend>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="file-input w-full"
        />
      </fieldset>
      {croppedImageUrl && <ProfileImage src={croppedImageUrl} />}
      {imgSrc && !croppedImageUrl && (
        <div className="bg-base-200 mt-4 rounded-lg border p-2">
          <p className="mb-2 text-center text-sm">
            Drag to adjust your picture
          </p>
          <ReactCrop
            crop={crop || undefined}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            circularCrop
            className="mx-auto max-w-xs"
          >
            <img
              ref={imgRef}
              src={imgSrc}
              onLoad={onImageLoad}
              className="h-full w-full object-contain"
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              alt="Upload"
              crossOrigin="anonymous"
            />
          </ReactCrop>
          <RangeInput
            label="Scale"
            name="scale"
            min="0"
            max="2"
            step="0.1"
            value={scale.toString()}
            disabled={!imgSrc}
            onChange={(value) => setScale(Number(value))}
          />
          <RangeInput
            label="Rotate"
            name="rotate"
            min="-180"
            max="180"
            step="1"
            value={rotate.toString()}
            disabled={!imgSrc}
            onChange={(value) => setRotate(Number(value))}
          />
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop?.width || 0,
              height: completedCrop?.height || 0,
              position: "absolute",
              top: "-500vh",
            }}
          />
          <div className="mt-2 flex justify-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={cancelCrop}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-neutral"
              onClick={confirmCrop}
              disabled={!completedCrop || !latestBlob}
            >
              Confirm Crop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
