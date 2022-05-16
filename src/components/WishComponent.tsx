import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { userService } from 'services';
import { notify } from 'utils/notifications';

const WishComponent = ({nftIdentifier, isFavorite, wishedCount}) => {

  // console.log(isFavorite)

  const [wish, setWish] = useState(isFavorite);
  const [wishcount, setWishCount] = useState(wishedCount);
  const user = userService.getUser()

  useEffect(() => {
    setWish(isFavorite)
  }, []);




  function onWishClick() {
    userService.addWish(nftIdentifier).then(x => {
        setWish(x?.data)
        if (x?.data) {
            setWishCount(wishcount + 1)
            notify({type: "success", message: "Added to your watch list"});
        } else if (wishcount > 0) {
            setWishCount(wishcount - 1)
            notify({type: "error", message: "Removed from watch list"});
        }
    });
  }

  
  return (
    <>
      {user?.roleTypeId == 2 ? 
          <a className="cursor-pointer" onClick={onWishClick}>
              {wish ? <img src="/heart.png" alt="" /> : <img src="/heart-o.png" alt="" />}
          </a> :
          <img src="/heart-o.png" alt="" />
      }
      <b>{wishcount}</b>
    </>
  )
}

WishComponent.propTypes = {
  nftIdentifier: PropTypes.string,
  isFavorite: PropTypes.bool,
  wishedCount: PropTypes.number,
}

export default WishComponent
