import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  bannerUpload,
  dataTest,
  db,
  storage,
} from "../../config/firebaseConfig";
import { uiControllerActions } from "../../store/uiControllerSlice";
import Loading from "../ui/Loading";
import ActiveOrders from "./ActiveOrders";
import EditMeal from "./EditMeal";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("ActiveOrders");
  const [selectedMeal, setSelectedMeal] = useState();
  const [DUMMY_MEAL, setDUMMY_MEAL] = useState([]);
  const [banners, setBanners] = useState([]);
  const [formUploading, setFormUploading] = useState(true);
  const [editMealActive, setEditMealActive] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerProgressing, setBannerProgressing] = useState(true);
  const [imageUpload, setImageUpload] = useState(null);
  const mealName = useRef();
  const mealIngredients = useRef();
  const mealPriceXl = useRef();
  const mealPriceMd = useRef();
  const mealPriceSm = useRef();
  const bannerLink = useRef();

  const addBannerHandler = () => {
    setFormUploading(true);
    if (!bannerUploading) {
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: "Görsel Seçilmedi",
          infoModalColor: "red",
        })
      );
      setFormUploading(false);
      return;
    }
    const dateNow = new Date().valueOf();
    const bannerRef = ref(storage, `bannerImages/${dateNow}`);
    uploadBytes(bannerRef, bannerUploading).then(() => {
      getDownloadURL(ref(storage, `bannerImages/${dateNow}`))
        .then((url) => {
          bannerUpload(dateNow, url, bannerLink.current.value);
        })
        .then(() => {
          dispatch(
            uiControllerActions.setInfoModal({
              infoModalActive: true,
              infoModalText: "Banner added Successfully",
              infoModalColor: "green",
            })
          );
          setFormUploading(false);
        })
        .catch((error) => {
          setFormUploading(false);
        });
    });
  };

  const addProductHandler = async () => {
    if (formUploading) return;
    setFormUploading(true);
    const dateNow = new Date().valueOf();
    const mealNameValue = mealName.current.value;
    const mealIngredientsValue = mealIngredients.current.value.split(",");
    const mealPricesValues = {
      xl: mealPriceXl.current.value,
      md: mealPriceMd.current.value,
      sm: mealPriceSm.current.value,
    };
    const uploadImageName = dateNow + "_" + mealNameValue.replace(/\s+/g, "-");
    // prettier-ignore
    if (imageUpload === null) { 
      dispatch(uiControllerActions.setInfoModal({infoModalActive: true, infoModalText: 'Fotoğraf Seçilmedi', infoModalColor: 'red',  })); 
      setFormUploading(false);
      return;
  }
    const imageRef = ref(storage, `mealImages/${uploadImageName}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(ref(storage, `mealImages/${uploadImageName}`)).then(
          (url) => {
            dataTest(
              mealNameValue,
              mealIngredientsValue,
              mealPricesValues,
              url,
              uploadImageName
            ).then(() => {
              setFormUploading(false);
              dispatch(
                uiControllerActions.setInfoModal({
                  infoModalActive: true,
                  infoModalText: "Meal added successfully",
                  infoModalColor: "green",
                })
              );
              getMeals();
              setCurrentPage("EditMeals");
            });
          }
        );
      })
      .catch((error) => {
        setFormUploading(false);
        console.log(error);
      });

    return;
  };

  useEffect(() => {
    getMeals();
    getBanners();
  }, []);

  const getMeals = async () => {
    setFormUploading(true);
    setDUMMY_MEAL([]);
    const querySnapshot = await getDocs(collection(db, "Meals"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      setDUMMY_MEAL((prevState) => [...prevState, data]);
      setFormUploading(false);
    });
  };

  const bannerDeleteHandler = async (deletingId, deletingImageName) => {
    console.log(banners);
    const deletingMealImgRef = ref(
      storage,
      `bannerImages/${deletingImageName}`
    );

    await deleteDoc(doc(db, "bannerImages", deletingId));
    await deleteObject(deletingMealImgRef);
    getBanners();
  };
  const getBanners = async () => {
    setBannerProgressing(true);
    setBanners([]);
    setFormUploading(true);
    const querySnapshot = await getDocs(collection(db, "bannerImages"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      setBanners((prevState) => [...prevState, data]);
      setFormUploading(false);
    });
    setBannerProgressing(false);
  };

  return (
    <div className="p-10">
      <div className="m-auto h-full max-w-7xl flex-row justify-start item-start flex">
        {/* Left Menu */}
        <div className="mt-7 pr-2">
          <span className="font-bold text-xl ml-5">Orders</span>
          <div className=" border  mb-4  w-48 text-left p-4 flex flex-col rounded-xl">
            <ul
              className=" hover:text-gray-500 cursor-pointer"
              onClick={() => setCurrentPage("ActiveOrders")}
            >
              Active Orders
            </ul>
            <hr className="mt-1 mb-1" />
            <ul className=" hover:text-gray-500 cursor-pointer">
              Order History
            </ul>
          </div>
          <span className="font-bold text-xl ml-5">Products</span>
          <div className=" border  mb-4  w-48 text-left p-4 flex flex-col rounded-xl">
            <ul
              className=" hover:text-gray-500 cursor-pointer"
              onClick={() => setCurrentPage("AddMeal")}
            >
              Add Product
            </ul>
            <hr className="mt-1 mb-1" />
            <ul
              className=" hover:text-gray-500 cursor-pointer"
              onClick={() => {
                setEditMealActive(false);
                setCurrentPage("EditMeals");
              }}
            >
              Edit Product
            </ul>
          </div>
          <span className="font-bold text-xl ml-5">Banner</span>
          <div className=" border  mb-4  w-48 text-left p-4 flex flex-col rounded-xl">
            <ul
              className=" hover:text-gray-500 cursor-pointer"
              onClick={() => setCurrentPage("AddBanner")}
            >
              Add Banner
            </ul>
            <hr className="mt-1 mb-1" />
            <ul
              className=" hover:text-gray-500 cursor-pointer"
              onClick={() => {
                setCurrentPage("EditBanners");
              }}
            >
              Edit Banner
            </ul>
          </div>
          <span className="font-bold text-xl ml-5">Users</span>
          <div className=" border  mb-4  w-48 text-left p-4 flex flex-col rounded-xl">
            <ul className=" hover:text-gray-500 cursor-pointer">Users List</ul>
            <hr className="mt-1 mb-1" />
            <ul className=" hover:text-gray-500 cursor-pointer">Edit Users</ul>
            <div className="flex items-center"></div>
          </div>
          <span className="font-bold text-xl ml-5">Live Support</span>
          <div className=" border  mb-4  w-48 text-left p-4 flex flex-col rounded-xl">
            <div className="flex flex-row items-center"></div>
            <ul className=" hover:text-gray-500 cursor-pointer">Messages</ul>
          </div>
        </div>
        {/* Dashboard */}
        <div className="w-full flex flex-col">
          <ActiveOrders currentPage={currentPage} />

          {/* Add Meal */}
          {currentPage === "AddMeal" && (
            <>
              <div className="text-center text-4xl font-bold mt-4">
                Add Product
              </div>
              <div className="bg-slate-50 p-8 rounded-xl flex flex-col">
                <label className="ml-2 font-bold mt-2">Category:</label>
                <select className="font-bold mt-2 p-4 border rounded-xl">
                  <option>Meal</option>
                  <option>Drink</option>
                </select>
                <label className="ml-2 font-bold mt-2">Product Picture:</label>
                <input
                  type="file"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setImageUpload(event.target.files[0]);
                  }}
                  className="border p-4 rounded-lg bg-white"
                  placeholder="Mozzarella Pizza"
                ></input>
                <label className="ml-2 font-bold mt-2">Product Name:</label>
                <input
                  ref={mealName}
                  className="border p-4 rounded-lg"
                  placeholder="Mozzarella Pizza"
                ></input>
                <label className="ml-2 font-bold mt-2">
                  Ingredients {"(Important: Add comma between ingredients)"}:
                </label>
                <input
                  ref={mealIngredients}
                  className="border p-4 rounded-lg"
                  placeholder="Example: Tomato, Mushroom, Olive"
                ></input>
                <label className="ml-2 font-bold mt-2">Price Options</label>
                <div className="flex flex-col">
                  <div className="flex flex-row  justify-start items-center">
                    <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 m-2 rounded-lg justify-center items-center text-center flex">
                      <span className="">Large</span>
                    </div>
                    <input
                      ref={mealPriceXl}
                      placeholder="20"
                      className="border h-12 flex flex-grow rounded-md p-4"
                    ></input>
                  </div>
                  <div className="flex flex-row  justify-start items-center">
                    <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 m-2 rounded-lg justify-center items-center text-center flex">
                      <span className="">Medium</span>
                    </div>
                    <input
                      ref={mealPriceMd}
                      placeholder="50"
                      className="border h-12 flex flex-grow rounded-md p-4"
                    ></input>
                  </div>
                  <div className="flex flex-row  justify-start items-center">
                    <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 m-2 rounded-lg justify-center items-center text-center flex">
                      <span className="">Small</span>
                    </div>
                    <input
                      ref={mealPriceSm}
                      placeholder="60"
                      className="border h-12 flex flex-grow rounded-md p-4"
                    ></input>
                  </div>
                </div>
                <button
                  className="bg-green-500  w-1/2 max-w-xs mt-6  m-auto text-white font-semibold rounded-xl hover:bg-green-600"
                  onClick={() => {
                    if (formUploading) return;
                    addProductHandler();
                  }}
                >
                  {formUploading ? (
                    <Loading margin={12} size={8} />
                  ) : (
                    <div className="p-4">Add Product</div>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Edit Meals */}
          {currentPage === "EditMeals" && (
            <>
              <div className="text-center text-4xl font-bold mt-4">
                Edit Product
              </div>
              <div className="bg-slate-50 p-8 rounded-xl flex flex-col">
                {!editMealActive && (
                  <>
                    {DUMMY_MEAL.map((meal) => (
                      <div
                        className="flex justify-between p-4 border border-gray-400 rounded-xl group duration-300 cursor-pointer mt-2 mb-2 bg-gray-200 hover:bg-gray-700"
                        key={meal.id}
                        onClick={() => {
                          setSelectedMeal(meal);
                          setEditMealActive(true);
                        }}
                      >
                        <div className="font-bold duration-300 group-hover:tracking-wider group-hover:text-white">
                          {meal.mealName}
                        </div>
                        <div className="text-rose-500 font-bold">...</div>
                      </div>
                    ))}
                  </>
                )}
                {editMealActive && (
                  <EditMeal
                    onFinishEditing={(editState) => {
                      setEditMealActive(false);
                      if (!editState) return;
                      getMeals();
                    }}
                    selectedMeal={selectedMeal}
                    formUploading={formUploading}
                  />
                )}
              </div>
            </>
          )}

          {/* Add Banner */}
          {currentPage === "AddBanner" && (
            <>
              <div className="text-center text-4xl font-bold mt-4">
                Add Banner
              </div>
              <div className="bg-slate-50 p-8 rounded-xl flex flex-col">
                <label className="ml-2 font-bold mt-2">
                  Pick banner image:
                </label>
                <input
                  type="file"
                  onChange={(event) =>
                    setBannerUploading(event.target.files[0])
                  }
                  className="border p-4 rounded-lg"
                ></input>
                <label className="ml-2 font-bold mt-2">Banner link:</label>
                <input
                  ref={bannerLink}
                  type="text"
                  className="border p-4 rounded-lg"
                ></input>
                <button
                  className="bg-green-500  w-1/2 max-w-xs  mt-6  m-auto text-white font-semibold rounded-xl hover:bg-green-600"
                  onClick={() => {
                    if (formUploading) return;
                    addBannerHandler();
                  }}
                >
                  {formUploading ? (
                    <Loading margin={12} size={8} />
                  ) : (
                    <div className="p-4">Add Banner</div>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Edit Banners */}
          {currentPage === "EditBanners" && (
            <>
              <div className="bg-slate-50 p-8 rounded-xl mt-6 flex flex-col">
                <>
                  <span className="flex justify-start ml-4 mb-4 font-bold">
                    Edit Banner:
                  </span>
                  {banners.map((banner) => (
                    <div
                      key={banner.bannerName}
                      className="flex border border-gray-300 rounded-2xl bg-gray-200 mb-4"
                    >
                      <div className="border p-2 m-2 flex-grow rounded-tl-xl rounded-bl-xl flex overflow-hidden bg-gray-200">
                        <img
                          alt="banner"
                          src={banner.bannerUrl}
                          className="w-1/3 h-28 object-contain rounded-md"
                        />
                        <div className="flex flex-col flex-grow">
                          <div className="w-full flex p-4 justify-center items-center">
                            <div>Link:</div>
                            <input
                              className="border w-full bg-gray-300 border-gray-400 ml-4 rounded-md p-2"
                              defaultValue={banner.bannerLink}
                            />
                          </div>
                          <div className="flex justify-end pr-4">
                            <button
                              className="border border-gray-300 bg-rose-500 text-white w-1/3 rounded-xl  ml-2 mr-2"
                              onClick={() => {
                                bannerDeleteHandler(
                                  banner.id,
                                  banner.bannerName
                                );
                              }}
                            >
                              <div className="text-white p-4">Delete</div>
                            </button>
                            <button className="w-1/3 max-w-xs bg-gray-700 rounded-xl">
                              {bannerProgressing ? (
                                <Loading size={8} margin={12} />
                              ) : (
                                <div className="text-white p-4">Save</div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <button className="bg-gray-300 group hover:bg-gray-500 duration-300 flex flex-1 w-14 justify-center items-center rounded-tr-xl border border-gray-400">
                          <svg
                            className="group-hover:fill-slate-50 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="24"
                          >
                            <path d="M6.7 14.675q-.275-.275-.275-.7 0-.425.275-.7l4.6-4.6q.15-.15.325-.213Q11.8 8.4 12 8.4t.375.062q.175.063.325.213l4.625 4.625q.275.275.275.675t-.3.7q-.275.275-.7.275-.425 0-.7-.275l-3.9-3.9L8.075 14.7q-.275.275-.675.275t-.7-.3Z" />
                          </svg>
                        </button>
                        <button className="bg-gray-300 group hover:bg-gray-500 duration-300 flex flex-1 w-14 justify-center items-center rounded-br-xl border border-gray-400">
                          <svg
                            className="group-hover:fill-slate-50 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="24"
                          >
                            <path d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
