import * as Slider from "@radix-ui/react-slider";
import "./Slider.css";
import React, { useState } from "react";

const SliderComponents = (props) => {
  const [customersHandler, setCustomersHandler] = useState(props.data);

  const handleCustomers = (value) => {
    setCustomersHandler(value);
    props.handleData(value, props.code);
  };

  return (
    <>
      <div className="flex gap-4 items-center justify-center w-full h-full">
        <Slider.Root
          className="SliderRoot"
          defaultValue={[customersHandler]}
          max={100}
          step={10}
          aria-label="Volume"
          onValueChange={(value) => handleCustomers(value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" value={customersHandler} />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
        <p className="h3">{customersHandler}%</p>

      </div>
    </>
  );
};

export default SliderComponents;
