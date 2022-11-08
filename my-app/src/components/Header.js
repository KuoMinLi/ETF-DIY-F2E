import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ETF-DIY
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="mx-2" onClick={() => handleLogin()}>
            登入
          </Button>
          <Button className="mx-2" onClick={() => handleRegister()}>
            註冊
          </Button>
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleLogout()}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <div className="px-8">
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={'ETF專區'}
              >
              <Dropdown.Item onClick={() => navigate("/etfindex")}>指數型</Dropdown.Item>
              <Dropdown.Item>高股息</Dropdown.Item>
              <Dropdown.Item>低波動</Dropdown.Item>
              <Dropdown.Item>主題型</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="px-8">
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={'ETF專區'}
              >
              <Dropdown.Item>指數型</Dropdown.Item>
              <Dropdown.Item>高股息</Dropdown.Item>
              <Dropdown.Item>低波動</Dropdown.Item>
              <Dropdown.Item>主題型</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="px-8">
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={'ETF專區'}
              >
              <Dropdown.Item>指數型</Dropdown.Item>
              <Dropdown.Item>高股息</Dropdown.Item>
              <Dropdown.Item>低波動</Dropdown.Item>
              <Dropdown.Item>主題型</Dropdown.Item>
            </Dropdown>
          </div>
          

          
          
          
          {/* <Navbar.Toggle />  */}

          {/* <Navbar.Link href="/#/navbars">自組ETF</Navbar.Link> */}
          {/* <Navbar.Link href="/#/navbars">績效比較</Navbar.Link> */}
          
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
