export default function AdminDashboard() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen">
      <button className="cursor-pointer text-nowrap flex p-5 justify-center items-center gap-5 bg-[#FFF] shadow-[006px0rgba(0,0,0,0.12)] w-full h-20 absolute left-0 top-0 overflow-hidden">
        <div className="shrink-0 rounded-[100px] bg-[rgba(0,0,0,0.10)] w-10 h-10"></div>
        <p className="shrink-0 text-[#000] font-roboto text-[28px] font-medium leading-9 w-[1321px] h-9">
          Administrator Dashboard
        </p>
        <button className="cursor-pointer text-nowrap flex justify-center items-center gap-10 bg-[#FFF] w-fit">
          <p className="text-[#000] font-roboto text-base leading-6 w-fit">
            Home
          </p>
          <p className="text-[#000] font-roboto text-base leading-6 w-fit">
            Reports
          </p>
          <p className="text-[#000] font-roboto text-base leading-6 w-fit">
            Settings
          </p>
          <div className="flex p-2 justify-end items-center gap-1 rounded-md border border-[rgba(0,0,0,0.10)] bg-[#E5E7EB] w-[200px]">
            <p className="text-[rgba(0,0,0,0.50)] font-roboto text-sm leading-5 w-full">
              Search in site
            </p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 w-5 h-5 relative "
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.136 14.9974C12.8155 16.1216 11.1038 16.8 9.23366 16.8C5.0547 16.8 1.66699 13.4123 1.66699 9.23335C1.66699 5.0544 5.0547 1.66669 9.23366 1.66669C13.4126 1.66669 16.8003 5.0544 16.8003 9.23335C16.8003 11.0922 16.1301 12.7945 15.018 14.1117L18.65 17.7437L17.7662 18.6276L14.136 14.9974ZM15.5503 9.23335C15.5503 12.722 12.7223 15.55 9.23366 15.55C5.74506 15.55 2.91699 12.722 2.91699 9.23335C2.91699 5.74475 5.74506 2.91669 9.23366 2.91669C12.7223 2.91669 15.5503 5.74475 15.5503 9.23335Z"
                fill="black"
                fillOpacity="0.7"
              />
            </svg>
          </div>
        </button>
      </button>
      <div className="flex py-3 px-0 flex-col items-start bg-[#F2F2F2] w-[223px] h-[1300px] absolute left-0 top-20 overflow-hidden">
        <div className="flex py-4 px-5 items-start gap-3 shrink-0 w-fit h-[52px]">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[183px]">
            Vessel Management
          </p>
        </div>
        <button className="cursor-pointer text-nowrap flex py-4 px-5 justify-center items-center gap-3 w-full">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-full">
            Schedule Management
          </p>
        </button>
        <div className="flex py-4 px-5 items-start gap-3 w-full">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-full">
            Booking
          </p>
        </div>
        <div className="flex py-4 px-5 items-start gap-3 shrink-0 w-fit h-[52px]">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[183px]">
            Manifests Management
          </p>
        </div>
        <div className="flex py-4 px-5 items-start gap-3 shrink-0 w-fit h-[52px]">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[183px]">
            Payment Management
          </p>
        </div>
        <div className="flex py-4 px-5 items-start gap-3 shrink-0 w-fit h-[52px]">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[183px]">
            Boarding Module
          </p>
        </div>
        <div className="flex py-4 px-5 items-start gap-3 shrink-0 w-fit h-[52px]">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[183px]">
            Route Management
          </p>
        </div>
        <button className="cursor-pointer text-nowrap flex py-4 px-5 justify-center items-center gap-3 w-full">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-full">
            Notification&#x2F;Alert
          </p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-4 px-5 justify-center items-center gap-3 w-full">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-full">
            User Management
          </p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-4 px-5 justify-center items-center gap-3 w-full">
          <p className="text-[#000] font-roboto text-base font-medium leading-5 w-full">
            Settings
          </p>
        </button>
        <div className="flex py-[17px] px-5 justify-center items-center gap-3 shrink-0 w-[220px] h-[70px]">
          <div className="flex pt-0 pr-[3px] pb-1.5 pl-0 justify-center items-end gap-[9px] w-[98px] h-[34px]">
            <div className="w-[27px] h-7 relative">
              <img
                src="/Exit.png"
                className="w-6 h-6 absolute left-[5px] top-1 max-w-none"
                alt="Exit"
              />
              <div className="bg-[#000] w-[226px] absolute left-[162px] -top-[17px]"></div>
            </div>
            <p className="text-[#000] font-roboto text-base font-medium leading-5 w-[59px] h-5">
              Logout
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start bg-[#FFF] w-[1480px] h-[1080px] absolute left-[225px] top-20 overflow-hidden">
        <div className="flex p-8 flex-col items-start shrink-0 bg-[#FFF] w-full h-[1080px]">
          <div className="flex max-w-[1280px] flex-col items-start gap-8 w-[1280px]">
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                  Dashboard Overview
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-[#525252] font-inter text-base leading-6 w-full tracking-[-0.0313em]">
                  Welcome back! Here's what's happening with your fleet today.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 w-full">
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Total Bookings Today
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-3.5">
                    <div className="flex flex-col items-start w-3.5 h-4">
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-3.5 h-4 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_2043_24518)">
                          <path
                            d="M4 0C4.55312 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0ZM0 6H14V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6ZM10.2812 9.53125C10.575 9.2375 10.575 8.7625 10.2812 8.47188C9.9875 8.18125 9.5125 8.17813 9.22188 8.47188L6.25313 11.4406L4.78438 9.97188C4.49063 9.67813 4.01562 9.67813 3.725 9.97188C3.43437 10.2656 3.43125 10.7406 3.725 11.0312L5.725 13.0312C6.01875 13.325 6.49375 13.325 6.78438 13.0312L10.2812 9.53125Z"
                            fill="#A3A3A3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2043_24518">
                            <path d="M0 0H14V16H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    127
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    +12% from yesterday
                  </p>
                </div>
              </div>
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Active Trips
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-4">
                    <div className="flex flex-col items-start w-4 h-4">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-4 h-4 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_2043_24521)">
                          <path
                            d="M16 3C16 4.56875 14.1531 6.90938 13.3562 7.84375C13.2375 7.98125 13.0625 8.03438 12.9031 8H10C9.44687 8 9 8.44687 9 9C9 9.55313 9.44687 10 10 10H13C14.6562 10 16 11.3438 16 13C16 14.6562 14.6562 16 13 16H4.3625C4.63438 15.6906 4.96563 15.2938 5.3 14.85C5.49688 14.5875 5.7 14.3 5.89375 14H13C13.5531 14 14 13.5531 14 13C14 12.4469 13.5531 12 13 12H10C8.34375 12 7 10.6562 7 9C7 7.34375 8.34375 6 10 6H11.2437C10.5875 5.01562 10 3.88438 10 3C10 1.34375 11.3438 0 13 0C14.6562 0 16 1.34375 16 3ZM3.65937 15.2844C3.54062 15.4187 3.43438 15.5375 3.34375 15.6375L3.2875 15.7L3.28125 15.6938C3.09375 15.8375 2.825 15.8187 2.65625 15.6375C1.86875 14.7812 0 12.5781 0 11C0 9.34375 1.34375 8 3 8C4.65625 8 6 9.34375 6 11C6 11.9375 5.34062 13.0938 4.64062 14.0594C4.30625 14.5188 3.9625 14.9344 3.67812 15.2625L3.65937 15.2844ZM4 11C4 10.7348 3.89464 10.4804 3.70711 10.2929C3.51957 10.1054 3.26522 10 3 10C2.73478 10 2.48043 10.1054 2.29289 10.2929C2.10536 10.4804 2 10.7348 2 11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12C3.26522 12 3.51957 11.8946 3.70711 11.7071C3.89464 11.5196 4 11.2652 4 11ZM13 4C13.2652 4 13.5196 3.89464 13.7071 3.70711C13.8946 3.51957 14 3.26522 14 3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2C12.7348 2 12.4804 2.10536 12.2929 2.29289C12.1054 2.48043 12 2.73478 12 3C12 3.26522 12.1054 3.51957 12.2929 3.70711C12.4804 3.89464 12.7348 4 13 4Z"
                            fill="#A3A3A3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2043_24521">
                            <path d="M0 0H16V16H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    23
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    Currently sailing
                  </p>
                </div>
              </div>
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Available Vessels
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-[18px]">
                    <div className="flex flex-col items-start w-[18px] h-4">
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-[18px] h-4 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_2043_24524)">
                          <path
                            d="M6.00002 1C6.00002 0.446875 6.4469 0 7.00002 0H11C11.5531 0 12 0.446875 12 1V2H13.5C14.3281 2 15 2.67188 15 3.5V7.5L16.3875 7.9625C17.1094 8.20312 17.3094 9.13438 16.7469 9.64688L13.5906 12.5406C13.0844 12.8344 12.5063 13.0125 12 13.0125C11.3875 13.0125 10.725 12.7719 10.15 12.3781C9.4594 11.8938 8.53752 11.8938 7.8469 12.3781C7.31252 12.7469 6.6594 13.0125 5.9969 13.0125C5.49065 13.0125 4.91252 12.8344 4.40627 12.5406L1.25002 9.64688C0.687523 9.13125 0.887523 8.20312 1.6094 7.9625L3.00002 7.5V3.5C3.00002 2.67188 3.6719 2 4.50002 2H6.00002V1ZM5.00002 6.83437L8.36877 5.7125C8.77815 5.575 9.2219 5.575 9.6344 5.7125L13 6.83437V4H5.00002V6.83437ZM9.57815 13.1844C10.2813 13.6687 11.1406 14 12 14C12.8406 14 13.7313 13.6625 14.4188 13.1844C14.7906 12.9187 15.2969 12.9406 15.6438 13.2375C16.0938 13.6094 16.6594 13.8937 17.225 14.025C17.7625 14.15 18.0969 14.6875 17.9719 15.225C17.8469 15.7625 17.3094 16.0969 16.7719 15.9719C16.0063 15.7937 15.3688 15.4563 14.9531 15.1906C14.0469 15.6781 13.0313 16 12 16C11.0031 16 10.1063 15.6906 9.48752 15.4094C9.30627 15.325 9.14065 15.2437 9.00002 15.1687C8.8594 15.2437 8.6969 15.3281 8.51252 15.4094C7.89377 15.6906 6.9969 16 6.00002 16C4.96877 16 3.95315 15.6781 3.0469 15.1938C2.62815 15.4563 1.99377 15.7969 1.22815 15.975C0.690648 16.1 0.153148 15.7656 0.0281485 15.2281C-0.0968515 14.6906 0.237523 14.1531 0.775023 14.0281C1.34065 13.8969 1.90627 13.6125 2.35627 13.2406C2.70315 12.9469 3.2094 12.925 3.58127 13.1875C4.2719 13.6625 5.1594 14 6.00002 14C6.8594 14 7.71877 13.6687 8.4219 13.1844C8.76877 12.9375 9.23127 12.9375 9.57815 13.1844Z"
                            fill="#A3A3A3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2043_24524">
                            <path d="M0 0H18V16H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    8
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    Out of 15 total
                  </p>
                </div>
              </div>
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Pending Payments
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-[18px]">
                    <div className="flex py-px px-0 flex-col items-start w-[18px] h-[17px]">
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-[18px] h-4 overflow-hidden relative "
                      >
                        <path d="M18 16H0V0H18V16Z" stroke="#E5E7EB" />
                        <path
                          d="M2 1C0.896875 1 0 1.89688 0 3V4H18V3C18 1.89688 17.1031 1 16 1H2ZM18 7H0V13C0 14.1031 0.896875 15 2 15H16C17.1031 15 18 14.1031 18 13V7ZM3.5 11H5.5C5.775 11 6 11.225 6 11.5C6 11.775 5.775 12 5.5 12H3.5C3.225 12 3 11.775 3 11.5C3 11.225 3.225 11 3.5 11ZM7 11.5C7 11.225 7.225 11 7.5 11H11.5C11.775 11 12 11.225 12 11.5C12 11.775 11.775 12 11.5 12H7.5C7.225 12 7 11.775 7 11.5Z"
                          fill="#A3A3A3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    $24,500
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    45 transactions
                  </p>
                </div>
              </div>
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Occupancy Rate
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-3">
                    <div className="flex py-0.5 px-0 flex-col items-start w-3 h-[18px]">
                      <svg
                        width="12"
                        height="16"
                        viewBox="0 0 12 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-3 h-4 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_2043_24530)">
                          <path
                            d="M11.7066 3.70624C12.0973 3.31562 12.0973 2.68124 11.7066 2.29062C11.316 1.89999 10.6816 1.89999 10.291 2.29062L0.291016 12.2906C-0.0996094 12.6812 -0.0996094 13.3156 0.291016 13.7062C0.681641 14.0969 1.31602 14.0969 1.70664 13.7062L11.7066 3.70624ZM4.00039 3.99999C4.00039 3.46956 3.78968 2.96085 3.4146 2.58578C3.03953 2.21071 2.53082 1.99999 2.00039 1.99999C1.46996 1.99999 0.96125 2.21071 0.586177 2.58578C0.211104 2.96085 0.000390619 3.46956 0.000390619 3.99999C0.000390619 4.53043 0.211104 5.03913 0.586177 5.41421C0.96125 5.78928 1.46996 5.99999 2.00039 5.99999C2.53082 5.99999 3.03953 5.78928 3.4146 5.41421C3.78968 5.03913 4.00039 4.53043 4.00039 3.99999ZM12.0004 12C12.0004 11.4696 11.7897 10.9609 11.4146 10.5858C11.0395 10.2107 10.5308 9.99999 10.0004 9.99999C9.46996 9.99999 8.96125 10.2107 8.58618 10.5858C8.21111 10.9609 8.00039 11.4696 8.00039 12C8.00039 12.5304 8.21111 13.0391 8.58618 13.4142C8.96125 13.7893 9.46996 14 10.0004 14C10.5308 14 11.0395 13.7893 11.4146 13.4142C11.7897 13.0391 12.0004 12.5304 12.0004 12Z"
                            fill="#A3A3A3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2043_24530">
                            <path d="M0 0H12V16H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    87%
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    Above average
                  </p>
                </div>
              </div>
              <div className="flex p-6 flex-col items-start gap-2 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-[193px] h-[154px]">
                <div className="flex justify-between items-center w-[143px]">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#737373] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Upcoming Departures
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-4">
                    <div className="flex flex-col items-start w-4 h-4">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-4 h-4 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_2043_24533)">
                          <path
                            d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM7.25 3.75V8C7.25 8.25 7.375 8.48438 7.58437 8.625L10.5844 10.625C10.9281 10.8562 11.3938 10.7625 11.625 10.4156C11.8562 10.0687 11.7625 9.60625 11.4156 9.375L8.75 7.6V3.75C8.75 3.33437 8.41562 3 8 3C7.58437 3 7.25 3.33437 7.25 3.75Z"
                            fill="#A3A3A3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2043_24533">
                            <path d="M0 0H16V16H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[143px]">
                  <p className="text-[#171717] font-inter text-3xl leading-9 w-full tracking-[-0.0167em]">
                    6
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#525252] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                    Next 2 hours
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-6 flex-col items-start gap-6 rounded-xl border border-[#E5E5E5] bg-[#FFF] w-[916px] h-[444px]">
              <div className="flex justify-between items-center w-[866px]">
                <div className="flex flex-col items-start gap-1 w-fit">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#171717] font-inter text-lg leading-7 w-full tracking-[-0.0278em]">
                      Daily Bookings Trend
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#525252] font-inter text-sm leading-5 w-full tracking-[-0.0357em]">
                      Last 7 days performance
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-3 items-center gap-2 rounded-lg border border-[#D4D4D4] bg-[#FFF] w-fit h-[42px]">
                  <p className="flex flex-col justify-center overflow-hidden text-[#404040] text-ellipsis font-inter text-sm w-[71px] h-full tracking-[-0.0357em]">
                    Last 7 days
                  </p>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[26px] h-[26px] overflow-hidden relative "
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.79936 9.37299C6.9856 9.19382 7.23536 9.09591 7.49375 9.10078C7.75214 9.10566 7.99802 9.21292 8.17736 9.39899L13.0004 14.5184L17.8234 9.39899C17.911 9.30235 18.0172 9.22428 18.1356 9.16942C18.254 9.11456 18.3822 9.08402 18.5126 9.07961C18.643 9.07521 18.773 9.09702 18.8948 9.14377C19.0166 9.19051 19.1278 9.26123 19.2218 9.35174C19.3158 9.44225 19.3907 9.55071 19.442 9.67068C19.4933 9.79066 19.52 9.91971 19.5205 10.0502C19.521 10.1807 19.4954 10.3099 19.445 10.4303C19.3946 10.5507 19.3206 10.6597 19.2274 10.751L13.7024 16.601C13.6114 16.6954 13.5024 16.7704 13.3818 16.8217C13.2611 16.8729 13.1314 16.8994 13.0004 16.8994C12.8693 16.8994 12.7396 16.8729 12.619 16.8217C12.4984 16.7704 12.3893 16.6954 12.2984 16.601L6.77336 10.751C6.59419 10.5648 6.49628 10.315 6.50115 10.0566C6.50603 9.79822 6.61329 9.55234 6.79936 9.37299Z"
                      fill="#404040"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex p-4 justify-between items-end shrink-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] w-[866px] h-64">
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#D4D4D4] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Mon
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#D4D4D4] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Tue
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#D4D4D4] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Wed
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#D4D4D4] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Thu
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#D4D4D4] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Fri
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#A3A3A3] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#171717] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Sat
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0 w-28">
                  <div className="flex flex-col items-start rounded bg-[#A3A3A3] w-full"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#171717] font-inter text-xs leading-4 w-fit tracking-[-0.0417em]">
                      Sun
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 justify-between items-center border-t border-t-[#E5E5E5] w-[866px]">
                <div className="flex items-center gap-2 w-fit">
                  <div className="flex flex-col items-start rounded bg-[#A3A3A3] w-3 h-3"></div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#525252] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                      Average: 234 bookings&#x2F;day
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#171717] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                    Peak: 312
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-6 flex-col items-start gap-6 rounded-lg border border-[#E5E5E5] bg-[#FFF] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#171717] font-inter text-lg leading-7 w-full tracking-[-0.0278em]">
                  Live Trip Status
                </p>
              </div>
              <div className="flex items-start gap-4 w-[1230px]">
                <div className="flex p-4 flex-col items-start gap-1 shrink-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] w-[399px] h-[126px]">
                  <div className="flex justify-between items-center w-[365px]">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#262626] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                        Departed
                      </p>
                    </div>
                    <div className="flex flex-col items-start shrink-0 rounded-full bg-[#737373] w-2 h-2"></div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#171717] font-inter text-base leading-6 w-full tracking-[-0.0313em]">
                      Ocean Explorer
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#525252] font-inter text-sm leading-5 w-full tracking-[-0.0357em]">
                      Route: Harbor A → Island B
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#737373] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                      Departed: 09:15 AM
                    </p>
                  </div>
                </div>
                <div className="flex p-4 flex-col items-start gap-1 shrink-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] w-[399px] h-[126px]">
                  <div className="flex justify-between items-center w-[365px]">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#262626] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                        Boarding
                      </p>
                    </div>
                    <div className="flex flex-col items-start shrink-0 rounded-full opacity-80 bg-[#737373] w-2 h-2"></div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#171717] font-inter text-base leading-6 w-full tracking-[-0.0313em]">
                      Sea Voyager
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#525252] font-inter text-sm leading-5 w-full tracking-[-0.0357em]">
                      Route: Port C → Marina D
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#737373] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                      Boarding: 45&#x2F;60 passengers
                    </p>
                  </div>
                </div>
                <div className="flex p-4 flex-col items-start gap-1 shrink-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] w-[399px] h-[126px]">
                  <div className="flex justify-between items-center w-[365px]">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#262626] font-inter text-sm leading-5 w-fit tracking-[-0.0357em]">
                        Delayed
                      </p>
                    </div>
                    <div className="flex flex-col items-start shrink-0 rounded-full bg-[#737373] w-2 h-2"></div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#171717] font-inter text-base leading-6 w-full tracking-[-0.0313em]">
                      Wave Rider
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#525252] font-inter text-sm leading-5 w-full tracking-[-0.0357em]">
                      Route: Dock E → Bay F
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#737373] font-inter text-xs leading-4 w-full tracking-[-0.0417em]">
                      Delayed: 30 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-[60px] justify-center items-center gap-[60px] w-full h-[220px] absolute left-0 top-[1160px] overflow-hidden">
        <button className="cursor-pointer text-nowrap flex justify-center items-center gap-[60px] w-fit h-[100px]">
          <p className="flex flex-col justify-center text-[#000] font-roboto text-xl leading-7 w-[369px] h-full text-center">
            Contact Us: guimarasgo@gmail.com
          </p>
          <p className="flex flex-col justify-center text-[#000] font-roboto text-xl leading-7 w-[250px] h-full text-center">
            © 2023 Guimaras Go
          </p>
          <p className="flex flex-col justify-center text-[#000] font-roboto text-xl leading-7 w-[124px] h-full text-center">
            Privacy Policy
          </p>
        </button>
      </div>
      <div className="w-[92px] h-[77px] absolute left-[917px] top-px">
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[21px] h-[23px] absolute left-[25px] top-[39px] "
        >
          <path
            d="M3.86509 0.0163372L14.7538 0.0164397L17.9509 0.0140976C18.5619 0.0123673 19.3326 -0.0353203 19.9286 0.0551152C20.6572 0.165704 21.2125 0.954739 21.2695 1.75716C21.3495 2.89038 21.3225 3.99326 21.3221 5.11956L21.3194 10.9322L21.3243 16.7177C21.3257 18.3147 21.5382 20.3702 20.5845 21.7097C19.7707 22.8528 18.7531 23.3108 17.4851 23.4828C15.7574 23.5174 14.2771 23.1714 12.9496 21.8309C11.6978 20.5672 11.6682 19.0302 11.6793 17.274C11.6891 15.7141 11.6927 14.1441 11.6875 12.5847C11.6846 11.6959 11.1557 10.8833 10.4165 10.5994C9.9223 10.4074 9.2247 10.4704 8.68788 10.4728L5.79495 10.4835C5.08428 10.4855 4.21009 10.5495 3.5408 10.3782C1.47416 9.84923 0.0456801 7.91594 0.00282444 5.51382C-0.0266894 3.85733 0.162209 2.64029 1.18387 1.41292C1.88021 0.565262 2.84379 0.0633108 3.86509 0.0163372Z"
            fill="url(#paint0_linear_2359_10)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2359_10"
              x1="10.6217"
              y1="23.3403"
              x2="10.6663"
              y2="0.0757454"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F6BF28" />
              <stop offset="1" stopColor="#F4953A" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="19"
          height="15"
          viewBox="0 0 19 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-3.5 absolute left-[23px] top-[19px] "
        >
          <path
            d="M9.87608 0.0129062C10.0221 -0.0126417 10.0788 -0.00495637 10.2112 0.0790159C12.6008 1.59499 17.414 5.23247 18.1921 8.31374C18.469 9.43815 18.3432 10.6409 17.8419 11.6607C16.5945 14.163 13.6817 14.9643 11.356 14.1485C11.1661 14.0819 10.2337 13.2674 9.90618 13.0601C9.3416 12.7275 8.58659 12.1302 8.09456 11.8712C5.57411 10.5449 2.78247 9.5833 0 9.56508C0.496659 8.819 0.968339 7.98492 1.46684 7.26393C3.16332 4.76517 5.29443 2.68745 7.72831 1.15946C8.29832 0.802094 9.26384 0.18482 9.87608 0.0129062Z"
            fill="url(#paint0_linear_2359_11)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2359_11"
              x1="9.37061"
              y1="14.4754"
              x2="8.80975"
              y2="0.103743"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F48147" />
              <stop offset="1" stopColor="#F26A5C" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="44"
          height="49"
          viewBox="0 0 44 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-[49px] absolute left-12 top-[18px] "
        >
          <path
            d="M43.6167 27.2909C43.3935 27.5711 43.2883 29.142 43.1707 29.6848C41.933 35.398 39.6438 39.8943 35.5649 43.611C30.9649 47.7272 25.107 49.5985 19.2865 48.8102C17.968 48.6442 16.8872 48.3481 15.6276 47.918C11.2562 46.4717 7.3866 43.5286 4.54977 39.4923C1.08583 34.5842 -0.48285 27.9433 0.129888 21.7139C0.711629 15.3642 3.52331 9.54652 7.93196 5.5702C12.5455 1.34004 18.4684 -0.60761 24.3645 0.16636C32.5767 1.25276 39.5508 7.47983 42.4025 16.2716C42.6913 17.1527 42.8971 18.0816 43.1158 18.9819C43.2317 19.4598 43.393 21.1549 43.6167 21.4273V27.2909ZM23.024 37.8887C29.5575 37.14 34.3223 30.5403 33.6746 23.1371C33.0268 15.734 27.2112 10.3225 20.675 11.0414C14.1204 11.7623 9.32724 18.3739 9.97682 25.7982C10.6264 33.2224 16.4721 38.6393 23.024 37.8887Z"
            fill="url(#paint0_linear_2359_12)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2359_12"
              x1="22.0016"
              y1="48.8422"
              x2="21.4585"
              y2="0.0758841"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F6C523" />
              <stop offset="1" stopColor="#F26758" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="45"
          height="61"
          viewBox="0 0 45 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[45px] h-[61px] absolute left-0 top-4 "
        >
          <path
            d="M0 25.5617C0.251144 25.2233 0.231195 24.1354 0.292593 23.6367C0.476439 22.2063 0.738124 20.7901 1.07615 19.3963C3.60016 9.11119 11.3175 1.5401 20.6635 0.179952C23.2046 -0.163825 25.6228 -0.0157298 28.1258 0.630144C28.9962 0.854732 30.0939 1.34915 30.8474 1.52325L30.7987 1.56448C30.3586 1.93243 29.8341 2.13498 29.3827 2.45962C26.8044 4.31357 24.4971 6.73075 22.6925 9.52693C21.9385 10.6952 20.9346 12.4721 20.3777 13.7813C19.5598 15.7524 18.9846 17.8413 18.6681 19.9896C17.8399 25.768 19.0954 31.681 22.1526 36.4004C24.8268 40.5609 28.3563 43.4612 32.46 45.5921C32.8561 45.7977 33.2783 45.9453 33.6723 46.1458C36.7077 47.6919 39.9814 48.5174 43.2577 49.093C43.7147 49.1734 44.1765 49.2579 44.64 49.2635C42.7096 54.5384 38.0822 58.7472 33.2962 60.1671C32.7699 60.3234 30.9434 60.5381 30.6299 60.8211H26.0669C25.7959 60.5483 24.4388 60.4328 23.9334 60.2923C22.6342 59.932 21.3602 59.6246 20.0986 59.0969C15.7741 57.2418 11.8579 54.3425 8.62199 50.5999C5.75394 47.2792 2.78378 42.1604 1.54183 37.7236C1.08692 36.146 0.731813 34.5343 0.479216 32.8998C0.382731 32.2781 0.312899 31.6694 0.239954 31.045C0.188466 30.6043 0.254191 29.8506 0 29.5473V25.5617ZM8.2247 38.9135C8.67495 38.5573 9.05517 38.2178 8.78205 37.5358C8.55968 36.9806 8.26032 36.4824 7.98342 35.9612C7.72898 35.4772 7.49597 34.9795 7.2852 34.4692C5.9648 31.342 5.21928 27.8116 4.96142 24.3626C4.91066 23.6835 5.08752 22.7296 4.26347 22.7476C3.67293 23.1716 3.79749 24.3616 3.76204 25.1083C3.56611 29.2345 4.38072 33.7046 6.41133 37.1827C6.7955 37.8392 7.41565 39.1858 8.2247 38.9135Z"
            fill="url(#paint0_linear_2359_13)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2359_13"
              x1="20.65"
              y1="60.1193"
              x2="26.2125"
              y2="0.263229"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F8D81F" />
              <stop offset="1" stopColor="#F26658" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="34"
          height="17"
          viewBox="0 0 34 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[34px] h-[17px] absolute left-[21px] top-0 "
        >
          <path
            d="M29.8434 0H33.8567C33.9254 0.143281 33.9654 0.446428 33.9528 0.608906C33.2413 9.89086 25.6355 16.9267 17.6293 16.8522C16.4453 16.8377 15.2645 16.71 14.0995 16.4704C10.6485 15.7415 5.58192 13.6478 3.05344 10.7715C0.828489 8.24043 -0.0559839 5.15584 0.0027293 1.61781C2.2505 1.99147 3.7394 2.48059 5.55461 4.13282C7.38464 5.82543 8.59678 8.22567 8.95737 10.8707C9.04928 11.5441 9.0469 12.1424 9.06118 12.819C9.06406 12.9555 9.10273 13.0254 9.19137 13.1026C9.35964 13.0009 9.63636 12.2905 9.75123 12.0501C10.2672 10.9707 10.8731 9.95015 11.5027 8.95668C13.1117 6.41807 15.1398 4.49012 17.561 3.0242C20.1899 1.43253 23.281 0.538104 26.2447 0.317659C26.7374 0.280978 27.1804 0.214762 27.6858 0.215203C28.3003 0.21574 28.9503 0.238767 29.5644 0.195264C29.6372 0.190095 29.7814 0.0554125 29.8434 0Z"
            fill="#B4CC43"
          />
        </svg>
      </div>
    </div>
  );
}