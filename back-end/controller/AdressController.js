import { Address } from "../model/address.js";

export const addAddress = async (req, res) => {
    const address = req.body
    console.log(address,'req.body')
    console.log(req.params)
    const userId = req.params.userId
    const addressWithId = {...address,userId:userId}
  try {
    // Create a new address using the request body
    const newAddress = new Address(addressWithId);
    console.log(addressWithId,'addreswith userid')
    // Save the new address to the database
    await newAddress.save();
    console.log(newAddress,'addres saved')
    // Respond with success message and the created address data
    res.status(201).json({
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    // Handle any errors during the creation process
    console.error(error);
    res.status(500).json({
      message: "Error adding address",
      error: error.message,
    });
  }
};

export const getAddress = async(req,res)=>{
    try {
    const userId = req.params.userId
    const userAddress = await Address.find({userId:userId})
    if(!userAddress){
        console.log('you never provided an address before')
        res.status(200).send({message:'you never provided an address before'})
    }
    if(userAddress.length>0){
        console.log(userAddress,'user address')
    res.status(200).send({data:userAddress,message:'fetched succesfully'})
}

    } catch (error) {
        console.log(error.message)
        res.send({message:error.message})
}
}

export const deleteAddressByid = async(req,res)=>{
    try {
        const idTodelete = req.params.id
        console.log(idTodelete,'idgot by req')
        const deletedAddress = await Address.findByIdAndDelete(idTodelete)
        console.log('deleted address',deletedAddress)
        res.status(200).send({messsage:'address deleted'})
    } catch (error) {
        console.log(error.message)  
    }
}