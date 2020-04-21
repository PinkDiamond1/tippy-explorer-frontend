import React from 'react'
import LogoIcon from '../../assets/ckb_logo.png'
import MobileLogoIcon from '../../assets/mobile_ckb_logo.png'
import MobileMenuIcon from '../../assets/menu_mobile.png'
import MobileMenuCloseIcon from '../../assets/menu_close_mobile.png'
import { HeaderPanel, HeaderEmptyPanel, HeaderMobileMenuPanel, HeaderLogoPanel } from './styled'
import { isMobile, isScreen750to1440 } from '../../utils/screen'
import { useAppState, useDispatch } from '../../contexts/providers/index'
import { ComponentActions } from '../../contexts/providers/reducer'
import MenusComp from './MenusComp'
import { SearchComp } from './SearchComp'
import { LanguageComp } from './LanguageComp'
import { BlockchainComp } from './BlockchainComp'

const LogoComp = () => {
  return (
    <HeaderLogoPanel to="/">
      <img src={isMobile() ? MobileLogoIcon : LogoIcon} alt="logo" />
    </HeaderLogoPanel>
  )
}

const MobileMenuComp = () => {
  const dispatch = useDispatch()
  const {
    components: { mobileMenuVisible },
  } = useAppState()
  return (
    <HeaderMobileMenuPanel
      role="button"
      tabIndex={-1}
      onKeyDown={() => {}}
      onClick={() => {
        dispatch({
          type: ComponentActions.UpdateHeaderMobileMenuVisible,
          payload: {
            mobileMenuVisible: !mobileMenuVisible,
          },
        })
      }}
    >
      <img alt="header mobile menu" src={mobileMenuVisible ? MobileMenuCloseIcon : MobileMenuIcon} />
    </HeaderMobileMenuPanel>
  )
}

export default ({ hasSearch }: { hasSearch?: boolean }) => {
  const {
    components: { searchBarEditable },
  } = useAppState()

  return (
    <HeaderPanel>
      <LogoComp />
      {!isMobile() && (
        <>
          {!(isScreen750to1440() && searchBarEditable) && <MenusComp />}
          <HeaderEmptyPanel />
          {hasSearch && <SearchComp />}
          <BlockchainComp />
          <LanguageComp />
        </>
      )}
      {isMobile() && (
        <>
          <HeaderEmptyPanel />
          <MobileMenuComp />
        </>
      )}
    </HeaderPanel>
  )
}
