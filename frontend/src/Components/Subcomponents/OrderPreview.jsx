import { Card } from '../Subcomponents/Card'
export const OrderPreview = ({Items}) => {
  console.log(Items,'need to map from orderpreview')

  return (
    <>
        <div className="">
                <Card productList={Items} noBuy={true} quantity={true}/>                
        </div>
    </>
  )
}
