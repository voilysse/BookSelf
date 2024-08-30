import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="footer bg-neutral text-neutral-content items-center p-4">
      <div class="container flex flex-col items-center justify-between  mx-auto  sm:space-y-0 sm:flex-row">
        <Link to="/" className="btn btn-ghost text-xl">
          BookSelf
        </Link>

        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
