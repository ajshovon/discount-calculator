// Copyright (c) 2022 [.shovon]
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const calculateBtn = document.getElementById("Calculate");
const resetBtn = document.getElementById("reset");

const getValue = (ClassName) => {
  const tempValue = parseFloat(document.querySelector(ClassName).value);
  return tempValue;
};

const calculationHandler = () => {
  // get values
  const productMRP = getValue(".mrp");
  const discountedPrice = getValue(".dis_price");
  const paymentDiscountPercentage = getValue(".dis_payment");
  const paymentDiscountLimit = getValue(".dis_payment_limit");

  //handle no input
  if (!productMRP || !discountedPrice) {
    document.getElementById("result").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById("notice_show").style.display = "block";
  }
  // handle invalid discounted price
  else if (productMRP - discountedPrice < 0) {
    document.getElementById("result").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById("notice_show").style.display = "block";
  }
  // calculate
  else {
    let paymentDiscountValue =
      (discountedPrice * paymentDiscountPercentage) / 100;
    if (paymentDiscountLimit && paymentDiscountValue > paymentDiscountLimit) {
      paymentDiscountValue = paymentDiscountLimit;
    } else if (!paymentDiscountPercentage) {
      paymentDiscountValue = 0;
    }
    const finalDiscountedPrice = discountedPrice - paymentDiscountValue;
    const totalDiscountValue = productMRP - finalDiscountedPrice;
    const finalDiscountPercentage = (totalDiscountValue / productMRP) * 100;
    const flatDiscountPercentage =
      ((productMRP - discountedPrice) / productMRP) * 100;
    console.log(finalDiscountedPrice, finalDiscountPercentage);

    // result output
    document.getElementById("result").style.display = "block";
    document.getElementById("offer_discount").innerHTML =
      "Flat " + flatDiscountPercentage.toFixed(2) + "% discount offer running";
    document.getElementById("final_price").innerHTML =
      "Final discounted price is <strong id=res_price>" +
      finalDiscountedPrice.toFixed(0) +
      " BDT </strong>";
    document.getElementById("total_discount_tk").innerHTML =
      "Total discount value is <strong>" +
      totalDiscountValue.toFixed(0) +
      " BDT</strong>";
    document.getElementById("total_discount_per").innerHTML =
      "Total discount percentage is <strong>" +
      finalDiscountPercentage.toFixed(0) +
      "% </strong>";
    document.getElementById("notice_show").style.display = "none";
    document.getElementById("info").style.display = "none";
  }
};

// reset button handler
const resetHandler = () => {
  document.getElementById("result").style.display = "none";
  document.getElementById("notice_show").style.display = "none";
  document.getElementById("info").style.display = "block";
  document.querySelector(".mrp").value = "";
  document.querySelector(".dis_price").value = "";
  document.querySelector(".dis_payment").value = "";
  document.querySelector(".dis_payment_limit").value = "";
};

calculateBtn.addEventListener("click", calculationHandler);
resetBtn.addEventListener("click", resetHandler);
