import React from 'react'
import { useState } from 'react';
import './rangeSlider.scss';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useRef } from 'react';
const RangeSilder = ({ selectRange, range }) => {
  const [rangleValue, setRangleValue] = useState(10);
  const openRef = useRef(null)
  const [showTooltip, setshowTooltip] = useState(true)
  const handleGetrangeValue = (e) => {
    // setRangleValue(e.target.value);
    selectRange(e.target.value)
    setshowTooltip((e.range == 0 || e.range == "") && false);
  }
  return (
    <div className="range">
      <div class="field">
        <input type="range" min="0" max="100" className="rangeInput" value={range === "" || range === "0" ? "0" : range} onChange={handleGetrangeValue} data-aa={60} steps="11" style={{ background: `linear-gradient(90deg, #0184ff ${range}%, #cbe6ff ${range}%)` }} />
        <div className={`sliderValue ${showTooltip ? 'show' : ''}`} style={{ left: range > 100 ? (100 + '%') : (range) + '%', }}>
          <span className={`rangle-tooptip`} style={{ left: range > 100 ? (32.5 + '%') : ((70 + (range / 1.6)) - (range) + '%') }}>{parseInt(range) > 100 ? `${100}+` : range}</span>
        </div>
        <div className='lables'>
          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
            </div>
          </div>
          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
              <p className='text-3xs w-300 base'>20</p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
              <p className='text-3xs w-300 base'>40</p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
              <p className='text-3xs w-300 base'>60</p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
              <p className='text-3xs w-300 base'>80</p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
            </div>
          </div>

          <div className='abc'>
            <div className='label'>
              <p className='down-arrow'></p>
              <p className='text-3xs w-300 base'>100</p>
            </div>
          </div>
          {/* <div className='label'>
            <p className='down-arrow'></p>
            <p className='text-3xs w-300 base'>100</p>
          </div> */}
        </div>
      </div>
    </div >
  )
}

export default RangeSilder