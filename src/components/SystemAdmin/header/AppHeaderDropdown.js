import React from "react";
import { Link } from "react-router-dom";
import {
  CNavItem,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("school");
  localStorage.removeItem("account");
};

const AppHeaderDropdown = () => {
  return (
    <>
      {" "}
      <b>ADMINISTRATOR- </b>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            size="md"
          />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">
            Account
          </CDropdownHeader>

          <Link to="/admin/info">
            <CDropdownItem>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
          </Link>

          <Link to="/admin/changepassword">
            <CDropdownItem>
              <CIcon icon={cilLockLocked} className="me-2" />
              PassWord
            </CDropdownItem>
          </Link>

          <CDropdownDivider />
          <CDropdownItem onClick={(e) => logout()} href="/">
            <CIcon icon={cilAccountLogout} className="me-2" />
            LogOut
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};

export default AppHeaderDropdown;
