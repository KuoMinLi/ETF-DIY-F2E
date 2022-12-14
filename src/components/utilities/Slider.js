import * as Slider from "@radix-ui/react-slider";
import "./Slider.css";
import React, { useState, useEffect } from "react";

const SliderComponents = (props) => {
  const [customersHandler, setCustomersHandler] = useState(props.percentage);

  useEffect(() => {
    setCustomersHandler(props.percentage);
  }, [props.percentage]);


  const handleCustomers = (value) => {
    setCustomersHandler(value);
    props.handleRatio(value, props.code);
  };
  console.log(customersHandler);

  return (
    <>
      <div className="flex gap-4 items-center justify-center w-full h-full">
        <Slider.Root
          className="SliderRoot"
          value={[customersHandler]}
          max={100}
          step={10}
          aria-label="Volume"
          onValueChange={(value) => handleCustomers(value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange"  />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
        <p className="h3">{customersHandler}%</p>

      </div>
    </>
  );
};

export default SliderComponents;
