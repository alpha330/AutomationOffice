/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceSlider = ({priceRange,handleSliderChange=()=>{}}) => {
  

  const formatNumber = (num) =>
    num.toLocaleString('fa-IR'); // نمایش عدد به فارسی

  const priceCliderContainer = css`
    direction:rtl;
    width: 300px;
    margin: 1rem;
  `
  const priceTitle = css`
    font-weight: bold;
    margin-bottom: 1rem;
    display: block;
  `

  const priceInputs = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `
  const priceBox = css`
    font-size: 1.2rem;
    font-weight: bold;
    background-color:transparent;
    // padding: 5px 10px;
    border-radius: 8px;
    // margin-top: 4px;
    color:white;
    border-bottom:white solid 1px;
  `

  const priceLabels = css`
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-top: 10px;
    color: white;
  `

  return (
    <div css={priceCliderContainer}>
      <label css={priceTitle}>محدوده قیمت</label>

      <div css={priceInputs}>
        <div>
          <span>تا</span>
          <div css={priceBox}>{formatNumber(priceRange[1])} تومان</div>
        </div>

        <div>
          <span>از</span>
          <div css={priceBox}>{formatNumber(priceRange[0])} تومان</div>
        </div>
      </div>

      <Slider
        range
        min={0}
        max={13050000}
        step={50000}
        defaultValue={[0, 13050000]}
        onChange={handleSliderChange}
        trackStyle={[{ backgroundColor: '#008cff' }]}
        handleStyle={[
          { borderColor: "#008cff", backgroundColor: "#008cff" },
          { borderColor: "#008cff", backgroundColor: "#008cff" },
        ]}
      />
      <div css={priceLabels}>
        <span>گران‌ترین</span>
        <span>ارزان‌ترین</span>
      </div>
    </div>
  );
};

export default PriceSlider;
