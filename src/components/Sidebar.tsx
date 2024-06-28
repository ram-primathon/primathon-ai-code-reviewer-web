"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import ENV from "@prima/config/env";
import { useOutsideClick } from "@prima/hooks";
import { SIDEBAR_MENU_LINK } from "@prima/constants/SidebarMenu";
import {
  BiExpandVertical,
  FaGithub,
  FcSynchronize,
  GoArrowRight,
  IoDocumentTextOutline,
  IoLogOutOutline,
  TbLayoutSidebarLeftCollapse,
} from "@prima/external/react-icon";
import { showToast } from "@prima/utils/showToast";
import { UNEXPECTED_ERROR_MESSAGE } from "@prima/constants/ErrorMessage";
import { useRouter } from "next/navigation";
import { IGitHubUser } from "@prima/api/IGitHubUser";
import { fetchGithubUser, getSynchronized } from "@prima/api";

interface SidebarProps {
  token: string;
}

const Sidebar = ({ token }: SidebarProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IGitHubUser | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [synchronizing, setSynchronizing] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const closePopup = () => setPopupIsOpen(false);

  const toggleSynchronizePopup = () => setPopupIsOpen(!popupIsOpen);

  const outsideClickRef = useOutsideClick(closePopup);

  const onSynchronize = async () => {
    setSynchronizing(true);
    try {
      await getSynchronized();
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast(UNEXPECTED_ERROR_MESSAGE, "error");
      }
    } finally {
      setSynchronizing(false);
    }
  };

  const onLogout = async () => {
    try {
      const response = await fetch("/api/oauth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      if (response.isSuccess) {
        router.replace("/");
      } else {
        showToast(UNEXPECTED_ERROR_MESSAGE, "success");
      }
    } catch (error) {
      showToast(UNEXPECTED_ERROR_MESSAGE, "error");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchGithubUser(token);
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      getUser();
    } else {
      showToast("Token is not available", "error");
    }
  }, [token]);

  return (
    <div
      className={`flex flex-col ${
        isCollapsed ? "items-center w-[92px]" : "w-72"
      } transition-width duration-300`}
    >
      <div className='relative p-3'>
        <button
          className='text-start w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded cursor-pointer'
          onClick={toggleSynchronizePopup}
        >
          <FaGithub size={40} />
          {!isCollapsed && (
            <>
              <div className='flex-1'>
                <span className='text-lg font-semibold flex-1 whitespace-nowrap'>
                  {user?.login}
                </span>
                <p className='text-xs text-gray-500'>Change Organization</p>
              </div>
              <BiExpandVertical className='shrink-0' size={20} />
            </>
          )}
        </button>
        {popupIsOpen && (
          <div
            ref={outsideClickRef}
            className='w-64 absolute top-4 left-full translate-x-4 bg-white shadow-md rounded'
          >
            <div className='py-2 px-4'>
              <div className='flex items-center gap-1.5'>
                <h3 className='text-base'>Organizations</h3>
                <button onClick={onSynchronize}>
                  <FcSynchronize
                    className={synchronizing ? "animate-spin" : ""}
                  />
                </button>
              </div>
              <p className='text-xs text-green-500'>
                {synchronizing ? "Syncing" : "Synced"}
              </p>
            </div>
            <div className='block border-t px-4 py-2'>
              <h4 className='text-sm'>{"Can't find an organization?"}</h4>
              <a
                href={ENV.GITHUB_APP_URL}
                className='group mt-1 flex items-center gap-1 text-xs text-muted-foreground'
                target='_blank'
                rel='noreferrer'
              >
                Check Permissions
                <GoArrowRight />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className='flex-1 overflow-y-auto border-t'>
        <ul className='mt-6 text-md'>
          {SIDEBAR_MENU_LINK.map(({ href, icon: Icon, label }) => (
            <li key={href} className='mx-3 my-0.5 whitespace-nowrap'>
              <Link
                href={href}
                className='flex gap-2 items-center px-4 py-3 hover:bg-gray-100 rounded'
              >
                <Icon size='24' />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='shrink-0 py-2'>
        <div className='mx-3 my-0.5 text-md whitespace-nowrap'>
          <Link
            href='/dashboard/docs'
            className='flex gap-2 items-center px-4 py-3 hover:bg-gray-100 rounded'
          >
            <IoDocumentTextOutline size='24' />
            {!isCollapsed && <span>Docs</span>}
          </Link>
        </div>

        <div
          className={`mx-3 my-4 flex items-center gap-2 rounded border ${
            isCollapsed ? "p-0" : "px-2 py-1"
          }`}
        >
          {!isCollapsed && (
            <>
              <Image
                src={(user?.avatar_url as string) || "/assets/default-user.png"}
                width={40}
                height={40}
                alt='Picture of the repository host'
                className='rounded-full'
              />
              <div className='flex-1'>
                <h3 className='text-lg font-semibold whitespace-nowrap'>
                  {user?.login}
                </h3>
                <p className='text-xs text-gray-500'>
                  {user?.site_admin ? "Admin" : "User"}
                </p>
              </div>
            </>
          )}
          <button
            className={`hover:bg-gray-100 p-2 rounded ${
              isCollapsed ? "px-4 py-3" : "p-2"
            }`}
            onClick={onLogout}
          >
            <IoLogOutOutline size='24' />
          </button>
        </div>

        <div
          className='mx-3 mb-1 px-4 py-2 cursor-pointer flex gap-2 items-center hover:bg-gray-100 rounded border'
          onClick={toggleCollapse}
        >
          <TbLayoutSidebarLeftCollapse
            size='24'
            className={
              isCollapsed ? "transition-all rotate-180" : "transition-all"
            }
          />
          {!isCollapsed && <p className='text-sm'>Collapse</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
