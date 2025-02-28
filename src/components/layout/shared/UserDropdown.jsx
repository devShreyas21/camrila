'use client'

// React Imports
import { useRef, useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'))
  }, [])

  const handleUserLogout = async () => {
    // Redirect to login page
    localStorage.setItem('accessToken', '')
    router.push('/')
    console.log(localStorage.getItem('accessToken'))

  }

  const handleWebsiteRedirect = () => {
    window.location.href = 'https://camrilla.com/'
  }

  const handleInstagramRedirect = () => {
    window.location.href = 'https://instagram.com/camrilla_photographers_app/'
  }

  const handleFacebookRedirect = () => {
    window.location.href = 'https://facebook.com/camrillathecommunity/'
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper
              elevation={settings.skin === 'bordered' ? 0 : 8}
              {...(settings.skin === 'bordered' && { className: 'border' })}
            >
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt='John Doe' src='/images/avatars/1.png' />
                    <div className='flex items-start flex-col'>
                      <Typography variant='body2' className='font-medium' color='text.primary'>
                        John Doe
                      </Typography>
                      <Typography variant='caption'>admin@Materialize.com</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/userProfile')}>
                    <i className='ri-user-3-line' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>

                  <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/privacyPolicy')}>
                    <i className='ri-shield-line' />
                    <Typography color='text.primary'>Privacy Policy</Typography>
                  </MenuItem>

                  <MenuItem className='gap-3 pli-4' onClick={handleWebsiteRedirect}>
                    <i className='ri-global-line' />
                    <Typography color='text.primary'>Visit Our Website</Typography>
                  </MenuItem>

                  <MenuItem className='gap-3 pli-4' onClick={handleInstagramRedirect}>
                    <i className='ri-instagram-line' />
                    <Typography color='text.primary'>Instagram</Typography>
                  </MenuItem>

                  <MenuItem className='gap-3 pli-4' onClick={handleFacebookRedirect}>
                    <i className='ri-facebook-circle-line' />
                    <Typography color='text.primary'>Facebook</Typography>
                  </MenuItem>

                  <div className='flex items-center plb-1.5 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={handleUserLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
