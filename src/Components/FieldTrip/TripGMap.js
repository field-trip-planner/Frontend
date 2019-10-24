import { functions, isEqual, omit } from 'lodash'
import React, { useEffect, useRef } from 'react'

function Map({ options, onMount, className, address, tripName }) {
  const divProps = { ref: useRef(), className };

  useEffect(() => {
    const onLoad = () => {
      if (!address) return;
      const map = new window.google.maps.Map(divProps.ref.current, options)

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);

          const markerOptions = {
            map,
            position: results[0].geometry.location,
            label: '',
            title: tripName
          };
          onMount(markerOptions);
          // console.log("Location address:", results[0])
        } else {
          alert(`Geocode failed due to the following reason: ${status}`);
        }
      });
    };
    if (window.google) {
      // console.log("Loading Called:");
      onLoad();
    }
  }, [divProps.ref, onMount, options, address]);

  return (
    <div
      style={{ height: 500, width: "100%", borderRadius: "0.5em" }}
      {...divProps}
    />
  )
}

const shouldUpdate = (prevProps, nextProps) => {
  delete prevProps.options.mapTypeId
  const [prevFuncs, nextFuncs] = [functions(prevProps), functions(nextProps)]
  return (
    isEqual(omit(prevProps, prevFuncs), omit(nextProps, nextFuncs)) &&
    prevFuncs.every(fn => prevProps[fn].toString() === nextProps[fn].toString())
  )
}

export default React.memo(Map, shouldUpdate);

Map.defaultProps = {
  options: {
    zoom: 16,
  },
  onMount: () => {}
}
