/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectLocation, getUserPlaces } from '../store/Slices/placeSlice';

const HistoryMenu = () => {
  const { searchHistory } = useSelector((state) => state.place);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPlaces());
  }, [dispatch]);

  const items = searchHistory?.map((history, i) => ({ key: i, label: history.value}));

  const onClick = ({key}) => {
    console.info(searchHistory[key]);
    dispatch(selectLocation(searchHistory[key]));
  };

  const menu = (
    <Menu
      selectable
      onClick={onClick}
      items={items}
    />
  );

  return items.length > 0 ? (
    <div className="history-dropdown">
      <Dropdown sele overlay={menu} getPopupContainer={trigger => trigger.parentElement}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Search History
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  ): null;
};

export default HistoryMenu;