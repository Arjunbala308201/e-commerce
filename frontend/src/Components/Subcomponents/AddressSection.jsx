import Aos from 'aos';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddAddress } from './AddAddress';

export const AddressSection = ({id}) => {
  const userId = useSelector(state=>state.user)._id
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addAddress, setAddAddress] = useState(false);

  const getAddressById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/address/get/${id}`);
      setAddress(response.data.data);
      console.log(response.data.data,'address')
      // Set the first address as the selected address if available
      if (response.data.data.length > 0) {
        setSelectedAddress(response.data.data[0]);
        console.log('address setted')
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(selectedAddress,'selected address')

  const deleteAddress = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4001/address/delete/${id}`);
      getAddressById(userId);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeAddAddress = () => {
    setAddAddress(!addAddress);
  };
  const addressChange = (addr) => {
    setSelectedAddress(addr);
  };

  useEffect(() => {
    getAddressById(userId);
    Aos.refresh();
  }, [id, userId]);

  return (
    <div className="mb-4">
    <div className="bg-gray-100 sm:p-4">
      {address.length > 0 ? (
        address.map((addr) => (
          <label key={addr._id} id="address" className="flex items-start gap-3 p-1 sm:p-3 border-b cursor-pointer">
            <input
              type="radio"
              className="mt-1 accent-blue-600"
              onChange={() => addressChange(addr)}
              checked={selectedAddress?._id === addr._id}
              id="address"
            />
            <div className="w-full text-xs">
              <div className="flex justify-between">
                <span className="font-semibold">{addr.name}</span>
                <button className="text-blue-600 text-[8px]" onClick={() => deleteAddress(addr._id)}>
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 text-[10px]">{addr.phone}</p>
              <p className="text-sm text-gray-600 text-[9px]">{addr.address}</p>
              {selectedAddress?._id === addr._id && (
                <button className="mt-3 bg-orange-500 text-white px-4 py-1 sm:py-2 rounded-md w-full">
                  DELIVER HERE
                </button>
              )}
            </div>
          </label>
        ))
      ) : (
        <p className="text-gray-600 text-center">No saved addresses found.</p>
      )}
    </div>

    <div
      className="text-blue-600 text-sm mt-2 font-semibold hover:cursor-pointer hover:font-bold"
      onClick={closeAddAddress}
    >
      {!addAddress && "+ Add a new address"}
    </div>

    {addAddress && <AddAddress close={closeAddAddress} fetchAddress={() => getAddressById(userId)} />}
  </div>
  )
}
