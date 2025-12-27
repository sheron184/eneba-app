import Logo from "./logo";
import SearchInput from "./search-input";

const TopBar = () => {
  return (
    <div className="w-full h-16 flex items-center px-4 justify-around align-middle">
      <Logo />
      <SearchInput />
      <div className="flex">
        <h1>❤️</h1>
        <h1>🛒</h1>
      </div>
    </div>
  )
}

export default TopBar;