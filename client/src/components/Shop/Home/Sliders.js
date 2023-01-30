import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Loading from '../Common/Loading';
import { HomeContext } from './';
import { getAllImages } from './FetchApi';

const Sliders = () => {
  const { state, dispatch } = useContext(HomeContext);
  const { slides, loading } = state;

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchAllSlideImages = async () => {
      dispatch({ type: 'loading', payload: true });

      try {
        const res = await getAllImages();
        dispatch({ type: 'slides', payload: res.data.images });
        dispatch({ type: 'loading', payload: false });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSlideImages();
    // eslint-disable-next-line
  }, []);

  const changeSlide = (type) => {
    if (type === 'nextSlide') {
      setCurrentImage(currentImage === slides.length - 1 ? 0 : currentImage + 1);
    } else if (type === 'prevSlide') {
      setCurrentImage(currentImage === 0 ? slides.length - 1 : currentImage - 1);
    }
  };

  if (loading)
    return (
      <div className="relative bg-gray-100 w-full h-[800px]">
        <Loading />
      </div>
    );

  return (
    <div className="p-8 lg:p-4 relative">
      {slides.length > 0 ? (
        <img
          alt="slideImage"
          src={`/uploads/customizes/${slides[currentImage]?.slideImage}`}
          className="w-full h-full object-cover"
        />
      ) : (
        ''
      )}
      {slides.length > 0 ? (
        <>
          <span
            onClick={() => changeSlide('prevSlide')}
            className="absolute top-1/2 left-12 md:left-8 transform -translate-y-1/2 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white cursor-pointer select-none"
          >
            <BsChevronLeft />
          </span>
          <span
            onClick={() => changeSlide('nextSlide')}
            className="absolute top-1/2 right-12 md:right-8 transform -translate-y-1/2 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white cursor-pointer select-none"
          >
            <BsChevronRight />
          </span>
        </>
      ) : null}
    </div>
  );
};

export default Sliders;
