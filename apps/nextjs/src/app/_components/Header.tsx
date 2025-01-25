const Header = () => {
  return (
    <header className="flex items-center gap-3 px-6 py-4 shadow-md">
      <div className="logo">
        <img
          src="lyra-logo.svg"
          alt="Logo of Lyra"
          className="h-10 w-10"
        />
      </div>
      <p className="font-semibold">Lyra Scraper</p>
    </header>
  );
};

export default Header;