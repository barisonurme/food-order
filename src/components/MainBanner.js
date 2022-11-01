import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../components/ui/Loading';
import { db } from '../config/firebaseConfig';

// const DUMMY_BANNER_ARRAY = [
//   {
//     id: 'b1',
//     src: 'images/mobil-m.jpg',
//   },
// ];

const MainBanner = () => {
  const [bannerNumber, setBannerNumber] = useState(0);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [DUMMY_BANNER_ARRAY, setDUMMY_BANNER_ARRAY] = useState([]);
  const bannerArrowHandler = (arrowDirection) => {
    switch (arrowDirection) {
      case 'left':
        if (bannerNumber !== 0) {
          setBannerNumber(bannerNumber - 1);
        } else {
          setBannerNumber(DUMMY_BANNER_ARRAY.length - 1);
        }
        break;
      case 'right':
        if (DUMMY_BANNER_ARRAY.length - 1 !== bannerNumber) {
          setBannerNumber(bannerNumber + 1);
        } else {
          setBannerNumber(0);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    setDUMMY_BANNER_ARRAY([]);
    const querySnapshot = await getDocs(collection(db, 'bannerImages'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      setDUMMY_BANNER_ARRAY((prevState) => [...prevState, data]);
      setBannerLoading(false);
    });
  };

  return (
    <div className="max-w-7xl flex flex-row justify-around m-auto mt-2 bg-black">
      {bannerLoading && <Loading />}
      <div className="hidden relative md:flex max-w-7xl  w-full  cursor-pointer hover:drop-shadow-xl overflow-hidden ease-in-out duration-500  items-center rounded-sm">
        {/* Banner Controls */}
        <div className="absolute flex justify-center items-center text-white h-auto">
          <div
            onClick={() => {
              bannerArrowHandler('left');
            }}
            className="select-none z-30  ml-4 hover:ml-3 bg-white opacity-50 hover:opacity-100 duration-500 text-gray-800 w-6 h-6 rounded-full flex justify-center items-center font-display font-black"
          >
            {'<'}
          </div>
        </div>
        <div
          onClick={() => {
            bannerArrowHandler('right');
          }}
          className="absolute right-0 flex justify-center items-center text-white h-full"
        >
          <div className="select-none z-30  mr-4 hover:mr-3 bg-white opacity-50 hover:opacity-100 duration-500 text-gray-800 w-6 h-6 rounded-full flex justify-center items-center font-display font-black">
            {'>'}
          </div>
        </div>
        <div className="flex">
          <img
            src="/images/black.jpg"
            className="flex w-full object-contain"
            alt="bannerBg"
          />
          {DUMMY_BANNER_ARRAY.map((banner) => (
            <div
              key={banner.bannerName}
              className="absolute w-full bg-black"
            >
              <img
                alt="mainBanner"
                className={`absolute ease-in-out
                ${
                  bannerNumber === DUMMY_BANNER_ARRAY.indexOf(banner) &&
                  'translate-x-0 duration-500'
                }
                ${
                  bannerNumber > DUMMY_BANNER_ARRAY.indexOf(banner) &&
                  '-translate-x-full duration-500'
                }
                ${
                  bannerNumber < DUMMY_BANNER_ARRAY.indexOf(banner) &&
                  'translate-x-full duration-500'
                }
              `}
                src={banner.bannerUrl}
              />
            </div>
          ))}
        </div>
        <div
          style={{ bottom: '0' }}
          className="flex justify-center items-center h-4 w-full b-0 left-0 right-0 m-auto absolute"
        >
          {DUMMY_BANNER_ARRAY.map((banner) => (
            <div
              key={banner.id}
              onClick={() => {
                setBannerNumber(DUMMY_BANNER_ARRAY.indexOf(banner));
              }}
            >
              <div
                className={`bg-white h-1 w-8 m-2 ${
                  bannerNumber === DUMMY_BANNER_ARRAY.indexOf(banner)
                    ? 'opacity-100'
                    : 'opacity-30'
                } duration-1000`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
