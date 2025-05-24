import React, { useEffect, useRef, useState } from 'react';

const AddressInput = ({ value, onChange, error, placeholder }) => {
  const inputRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState(value || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google Maps script if not already loaded
    if (!window.google) {
      setIsLoading(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoading(false);
        initAutocomplete();
      };
      document.head.appendChild(script);
    }

    // Initialize autocomplete when Google Maps is loaded
    const initAutocomplete = () => {
      if (window.google && inputRef.current && !autocomplete) {
        const newAutocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
          componentRestrictions: { country: ['us', 'ca', 'gb', 'au', 'in', 'sa', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'ru', 'tr', 'ua', 'vn'] },
          fields: ['formatted_address', 'address_components', 'geometry', 'name', 'place_id'],
        });

        // Style the dropdown to match our UI
        const style = document.createElement('style');
        style.textContent = `
          .pac-container {
            background-color: #1C1C1C !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 5px 10px -5px rgba(0,0,0,0.04) !important;
            border: 1px solid #6C6C6C !important;
            padding: 8px 0 !important;
            margin-top: 8px !important;
            z-index: 999 !important;
            font-family: inherit !important;
            max-height: 380px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            scrollbar-width: thin !important;
            scrollbar-color: #302F2F transparent !important;
            backdrop-filter: blur(8px) !important;
          }

          .pac-item {
            padding: 12px 16px !important;
            cursor: pointer !important;
            margin: 2px 4px !important;
            border: none !important;
            border-radius: 8px !important;
            font-family: inherit !important;
            line-height: 1.5 !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            transition: all 0.2s ease !important;
            background: transparent !important;
            color: #FFFFFF !important;
          }

          .pac-item:hover, .pac-item-selected, .pac-item-selected:hover {
            background-color: #302F2F !important;
            color: #FFFFFF !important;
            transform: translateX(4px) !important;
          }

          .pac-item-query {
            color: #FFFFFF !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            padding-right: 8px !important;
            flex: 1 !important;
          }

          .pac-matched {
            font-weight: 600 !important;
            color:rgb(137, 137, 137) !important;
            position: relative !important;
          }

          .pac-secondary-text {
            font-size: 13px !important;
            color: #868686 !important;
            opacity: 0.9 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 200px !important;
          }
        `;
        document.head.appendChild(style);

        newAutocomplete.addListener('place_changed', () => {
          const place = newAutocomplete.getPlace();
          if (place) {
            let formattedAddress = '';
            let postalCode = '';
            
            // Extract postal code from address components
            if (place.address_components) {
              const postalComponent = place.address_components.find(
                component => component.types.includes('postal_code')
              );
              if (postalComponent) {
                postalCode = postalComponent.long_name;
              }
            }
            
            // Format the address with postal code
            if (place.name && place.formatted_address && !place.formatted_address.includes(place.name)) {
              formattedAddress = `${place.name}, ${place.formatted_address}`;
            } else {
              formattedAddress = place.formatted_address || place.name;
            }

            // Append postal code if not already in the address
            if (postalCode && !formattedAddress.includes(postalCode)) {
              formattedAddress = `${formattedAddress} ${postalCode}`;
            }

            setInputValue(formattedAddress);
            // Create a synthetic event to match the form's onChange handler
            const event = {
              target: {
                name: 'ownerAddress',
                value: formattedAddress,
                type: 'text'
              }
            };
            onChange(event);
          }
        });

        // Prevent form submission on enter
        inputRef.current.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });

        setAutocomplete(newAutocomplete);
      }
    };

    // Check if Google Maps is loaded every 100ms
    if (window.google) {
      initAutocomplete();
    }

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [autocomplete, onChange]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Create a synthetic event to match the form's onChange handler
    const event = {
      target: {
        name: 'ownerAddress',
        value: newValue,
        type: 'text'
      }
    };
    onChange(event);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-[#F1E8E2]/20'
        } bg-white focus:outline-none focus:ring-2 focus:ring-[#F1E8E2]/40 text-gray-700`}
        placeholder={placeholder}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#F1E8E2]/20 border-t-[#F1E8E2]"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AddressInput; 