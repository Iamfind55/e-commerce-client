import React, { useCallback, useEffect, useState, useRef } from "react";
import "./style.css";

interface RangePropType {
  onChange: (min: number, max: number) => void;
}
const RangeMultiSlider = ({ onChange }: RangePropType) => {
  const min = 1;
  const max = 100000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const sliderTimeout = useRef<any>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const handleChange = (minValue: number, maxValue: number) => {
    onChange(minValue, maxValue);
  };

  const debounceSliderChange = (minValue: number, maxValue: number) => {
    if (sliderTimeout.current) {
      clearTimeout(sliderTimeout.current);
    }

    sliderTimeout.current = setTimeout(() => {
      handleChange(minValue, maxValue);
    }, 500);
  };

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    debounceSliderChange(minVal, maxValRef.current);
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    debounceSliderChange(minValRef.current, maxVal);
  }, [maxVal, getPercent]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">${minVal}</div>
        <div className="slider__right-value">${maxVal}</div>
      </div>
    </div>
  );
};

export default RangeMultiSlider;
