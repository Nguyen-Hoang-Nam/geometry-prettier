import { ReactComponent as Github } from "../img/github.svg";

function Footer(props) {
  return (
    <div className="flex flex-row-reverse py-1 pr-2">
      <Github className="h-5" />
    </div>
  );
}

export default Footer;
