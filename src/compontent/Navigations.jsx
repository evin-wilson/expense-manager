import SideNavigation from './SideNavigation';
import Navbar from 'react-bootstrap/Navbar';
const Navigations = () => {
  return (
    <>
      <div
        className='bg-dark vh-100 pt-3 position-fixed'
        style={{ width: '240px', zIndex: 3 }}
      >
        <SideNavigation />
      </div>
      <Navbar bg='light' variant='dark' fixed='top' className='fs-3 text-end'>
        search bar have to come <hr />
      </Navbar>
      {/* <nav className='fs-3 text-end fixed-top' style={{ height: '60px' }}>
        search bar have to come
        <hr />
      </nav> */}
    </>
  );
};

export default Navigations;
