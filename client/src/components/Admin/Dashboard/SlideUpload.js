import React, { useContext, useEffect } from 'react';
import { BsCloudUpload, BsX } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import { DashboardContext } from './';
import { deleteSlideImage, getAllSlideImages, uploadSlideImage } from './FetchApi';

const SlideUpload = () => {
  const { state, dispatch } = useContext(DashboardContext);

  const { images, loading } = state;

  useEffect(() => {
    fetchAllSlideImages();
    // eslint-disable-next-line
  }, []);

  const fetchAllSlideImages = async () => {
    dispatch({ type: 'loading', payload: true });

    try {
      const res = await getAllSlideImages();
      dispatch({ type: 'images', payload: res.data.images });
      dispatch({ type: 'loading', payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (image) => {
    let formData = new FormData();
    formData.append('slideImage', image);

    try {
      const res = await uploadSlideImage(formData);
      console.log(res);
      if (res && res.data.success) {
        fetchAllSlideImages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await deleteSlideImage(id);
      if (res && res.data.success) {
        fetchAllSlideImages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-8 py-4 w-full h-auto bg-white border-t-4 border-black rounded-bl-md rounded-br-md shadow-lg space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-light text-black/70">{images && images.length} slides</span>
        </div>
        <div
          onClick={() => dispatch({ type: 'btnUpload', payload: !state.btnUpload })}
          className="relative px-6 py-2 rounded-full select-none bg-black text-white"
        >
          <div className="flex items-center">
            <BsCloudUpload />
            <span className="ml-2 text-sm">Upload</span>
          </div>
          <input
            type="file"
            name="image"
            onChange={(e) => handleUploadImage(e.target.files[0])}
            className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
          />
        </div>
      </div>

      <div className="pb-6 flex space-x-4 overflow-x-auto">
        {images.length > 0 &&
          images.map((img) => {
            return (
              <div key={img._id} className="relative flex-shrink-0">
                <img
                  alt="name"
                  src={`/uploads/customizes/${img.slideImage}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30 z-10" />
                <span
                  onClick={() => handleDeleteImage(img._id)}
                  className="absolute top-4 right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer select-none text-2xl z-20"
                >
                  <BsX />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlideUpload;
