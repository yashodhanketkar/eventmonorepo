export const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <footer className="grid w-full grid-cols-2 px-4 py-2 bg-black/5">
      <div className="text-left">Events</div>
      <div className="text-right">
        <a
          href="https://github.com/yashodhanketkar/eventmonorepo"
          target="_blank"
        >
          Github
        </a>
      </div>
      <div className="col-span-2 text-xs text-center">
        ©{currentYear !== 2023 && "2023-"}
        {currentYear} Events. All rights reserved
      </div>
    </footer>
  );
};
