import React from "react";

const Footer: React.FC = () => {

  return (
    <div className="Footer fixed w-full flex bottom-0 h-12 justify-center bg-neutral-800">
      <div className="flex flex-row items-center h-full gap-4">
        <div className="text-white">Contact</div>
        <div className="text-white">Privacy</div>
        <div className="text-white">Terms</div>
      </div>
    </div>
  )
}

export default Footer;
