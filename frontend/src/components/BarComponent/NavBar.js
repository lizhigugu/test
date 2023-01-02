// mui import 
import MuiAppBar from '@mui/material/AppBar';
import {styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import { Dialog } from '@mui/material';

// mui icon import
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// react import
import {useState, Fragment, useEffect } from "react";

// Component Import 
import BarDrawer from './barDrawer';
import { drawerWidth } from './BarConstDef';
import CartList from '../CartList';
import CartInclude from './CartItem';

//hooks import
import { useWebsite } from '../../containers/hooks/WebsiteContext';
import useBackend from '../../containers/hooks/useBackend';

// styled component
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

// functional component
const NavBar = ({open, setOpen}) => {
    // set state
    const [anchorEl, setAnchorEl] = useState(null);
    const [openCart, setOpenCart] = useState(false);
    
    //advoid undefined list of items rendered.
    const { bill, currentBillId } = useWebsite();
    const { GetBill } = useBackend();

    // set theme
    const theme = useTheme();

    useEffect(()=>{
      GetBill(currentBillId);
    },[])
    
    const handleCart = async() => {
      await GetBill(currentBillId);
      setOpenCart(true);
      console.log("open cart", bill, bill.length);
    };
    
    const handleDrawer = () => {
        setOpen(!open);
    }
    
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
      <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="static" style={{ background: '#b0bec5' }} open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e)=>{handleDrawer()}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GoMyWonJam
            </Typography>
            <Fragment>
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>{handleCart()}}
                    color="inherit"
                  >
                    <ShoppingCartIcon />
              </IconButton>
              <Dialog 
                open={openCart} 
                onClose={()=>{setOpenCart(false)}} 
                fullWidth={true}
                >
                <CartInclude open={openCart} setOpen={setOpenCart} />
              </Dialog>
            </Fragment>
          </Toolbar>
        </AppBar>
      </Box>
      <BarDrawer open={open} setOpen={setOpen} theme={theme} />
      </>
    )
}

// export

export default NavBar;


