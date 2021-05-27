import { ReactComponent as Github } from "../img/github.svg";

function Footer(props) {
  return (
    <div className="flex flex-row-reverse py-1 pr-2">
      <a
        target="blank"
        href="https://github.com/Nguyen-Hoang-Nam/geometry-prettier"
      >
        <Github className="h-5" />
      </a>
    </div>
  );
}

export default Footer;
