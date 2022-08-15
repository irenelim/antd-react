import { AutoComplete } from "antd";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setUserPlace } from '../store/Slices/placeSlice'


const places = [
  { value: "Mantin", lat: 2.824290, lng: 101.894478 },
  { value: "Seremban", lat: 2.7259, lng: 101.9378 },
  { value: "Kuala Lumpur", lat: 3.1569, lng: 101.7123 },
  { value: "Alor Setar", lat: 6.1263, lng: 100.3672 },
  { value: "Kota Kinabalu", lat: 5.9804, lng: 116.0735 },
  { value: "Ipoh", lat: 4.5975, lng: 101.0901 },
  { value: "Kuantan", lat: 3.8168, lng: 103.3317 },
  { value: "Kuching", lat: 1.5535, lng: 110.3593 },
  { value: "Miri", lat: 4.3995, lng: 113.9914 },
  { value: "George Town", lat: 5.4141, lng: 100.3288 },
  { value: "Langkawi", lat: 6.3500, lng: 99.8000 },
  { value: "Pasir Gudang", lat: 1.4703, lng: 103.9030 },
  { value: "Kuala Terengganu", lat: 5.3296, lng: 103.1370 },
];

const isOption = (val, opts) => (opts.findIndex((option) => opts?.value?.toLowerCase() === val?.toLowerCase()) > -1);


function Search() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  const updateOptions = (inputTxt) => {
    const latestOpts = !inputTxt ? [] : places.filter(p=>p.value.toLowerCase().includes(inputTxt.toLowerCase()));
      setOptions(latestOpts);
  };

  const onFocus = (e) => {
    const inputTxt = e?.target.value;
    updateOptions(inputTxt);
  };

  const onSearch = (data) => {
    updateOptions(data);
  };

  const onSelect = (data) => {
    setStatus('');
    const optionSelected = options.find((opt) => opt.value === data)
    // dispatch(latestSearch(optionSelected));
    dispatch(setUserPlace(optionSelected));
    setValue('');
  };

  const onChange = (data) => {
    setValue(data);
    setStatus(isOption(data, options) ? '' : 'error');
  };

  return (
      <AutoComplete
        allowClear
        value={value}
        status={status}
        style={{ width: 200 }}
        options={options}
        placeholder="Search place..."
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        onFocus={onFocus}
        notFoundContent="No such place available"
        filterOption={(inputValue, option) => 
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
  );
}

export default Search;
