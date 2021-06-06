---
title: "[React] Common components"
header:
  overlay_image: /assets/images/default-header.png
categories:
  - React
last_modified_at: 2021-06-06T23:38:00+09:00
---

> styled-components를 이용한 컴포넌트들

### MainPage

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dateformat from 'dateformat';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import TabNav from '../components/TabNav';
import TableWithImage from '../components/TableWithImage';
import RowDetailPage from './RowDetailPage';

const GET_URL = "";

const MainPage = (props) => {
    let [pageIdx, setPageIdx] = useState(0);
    let [activeTab, setActiveTab] = useState(0);
    let [trackList, setTrackList] = useState([]);
    let [trackDetailInfo, setTrackDetailInfo] = useState({});

    useEffect(() => {
        fetchTrackList(0);
    }, []);

    const fetchTrackList = (id) => {
        axios.get("").then((res) => {
            setTrackList(res.data.chartList);
        });
    };

    const fetchTrackDetailInfo = (id) => {
        axios.get("").then((res) => {
            setTrackDetailInfo(res.data.chart);
        });
    }

    const handleTabClick = (idx) => {
        fetchTrackList(idx);
        setActiveTab(idx);
    };

    const handleTrackClick = (id) => {
        fetchTrackDetailInfo(id);
        setPageIdx(1);
    };

    const handleBackButtonClick = () => setPageIdx(0);

    return (
        <Container>
            {pageIdx === 0 ? (
                <>
                    <PageTitle
                        title={"제목"}
                        subTitle={dateformat(Date.now(), "yyyy년 mm월 dd일 HH:MM")}
                    />
                    <TabNav activeTab={activeTab} handleTabClick={handleTabClick} />
                    <TableWithImage dataList={trackList} handleRowClick={handleTrackClick} />
                </>
            ) : (
                <>
                    <RowDetailPage
                        rowDetailInfo={trackDetailInfo}
                        handleBackButtonClick={handleBackButtonClick}
                    />
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    margin: 80px;
    padding: 20px;
    border: 5px solid black;
`;

export default MainPage;
```

### RowDetailPage

```jsx
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';

const RowDetailPage = (props) => {
    const { rowDetailInfo, handleBackButtonClick } = props;
    const { title, singer, melodizer, lyricist, genre } = rowDetailInfo;

    return (
        <>
            <div style={\{display: "flex", alignContent: "left"}\}>
                <button onClick={handleBackButtonClick}>Back</button>
            </div>
            <PageTitle title={title} subTitle={singer}/>
            <Table rowData={[lyricist, melodizer, genre]}/>
        </>
    );
};

export default RowDetailPage;
```

### PageTitle
```jsx
import styled from 'styled-components';

const PageTitle = (props) => {
    const { title, subTitle } = props;
    
    return (
        <>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
        </>
    );
};

const Title = styled.div`
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SubTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default PageTitle;
```

### TabNav

```jsx
import styled from 'styled-components';

const TabNav = (props) => {
    const { activeTab, handleTabClick } = props;
    const tabTitles = [ 'A', 'B' ];

    return (
        <Container>
            {tabTitles.map((title, idx) => {
                return (
                    <Tab
                        key={idx}
                        onClick={() => handleTabClick(idx)}
                        style={\{ background: activeTab === idx ? "cornflowerblue" : "none" }\}
                    >
                        {title}
                    </Tab>
                );
            })}
        </Container>
    );
};

const Container = styled.ul`
    display: flex;
    justify-content: left;
    width: 500px;
    font-size: 20px;
    list-style: none;
`;

const Tab = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 35px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
`;

export default TabNav;
```

### Table

```jsx
import TableRow from './TableRow';

const Table = (props) => {
    const rowTitles = [ 'A', 'B', 'C'];
    const { rowData } = props;

    return (
        <div>
            {rowTitles.map((rowTitle,idx) => {
                return (
                    <TableRow
                        rowTitle={rowTitle}
                        key={idx}
                        data={rowData[idx]}
                    />
                );
            })}
        </div>
    );
};

export default Table;
```

### TableRowWithImage
```jsx
import styled from 'styled-components';

const TableRowWithImage = (props) => {
    const { data , handleRowClick } = props;
    const { id, rank, title, singer, imageUrl } = data;
    const IMAGE_FILE_PATH = "images/";

    return (
        <Row onClick={() => handleRowClick(id)}>
            <RankCol>{rank}</RankCol>
            <ImageCol src={"fallback.png"}/>
            <AlignLeftCol>{title}</AlignLeftCol>
            <AlignRightCol>{singer}</AlignRightCol>
        </Row>
    );
};

const Row = styled.li`
    display: flex;
    width: 100%;
    height: 50px;
    cursor: pointer;
    align-content: center;
    vertical-align: middle;
`;

const RankCol = styled.span`
    width: 3%;
    font-weight: bold;
    padding: 10px;
`;

const ImageCol = styled.img`
    height: 100%;
`;

const AlignLeftCol = styled.span`
    width: 40%;
    text-align: left;
    padding: 10px;
`;

const AlignRightCol = styled.span`
    width: 40%;
    text-align: right;
    padding: 10px;
`;

export default TableRowWithImage;
```

### TableWithImage
```jsx
import styled from 'styled-components';
import TableRowWithImage from './TableRowWithImage';

const TableWithImage = (props) => {
    const { dataList , handleRowClick } = props;

    return (
        <Table>
            {dataList.length > 0 &&
                dataList.map((data,idx) => {
                    return (
                        <TableRowWithImage
                            data={data}
                            key={idx+1}
                            handleRowClick={handleRowClick}
                        />
                    );
                })}
        </Table>
    );
};

const Table = styled.ul`
    list-style: none;
`;

export default TableWithImage;
```