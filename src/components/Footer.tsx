const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content fixed bottom-0 left-0 z-50 p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          SupTarr
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
