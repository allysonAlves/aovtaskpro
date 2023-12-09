import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { taskContext } from "../../context/TaskProvider";
import ReactTable from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const HomeContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  margin-top: 20px;
`;

const tableColumns = [
  {
    Header: () => <>id</>,
    Cell: row => (
      <div>{row.id}</div>
    ),
    accessor: 'id',
    sortable: false,
    filterable: false,
    minWidth: 86,
  }
];

const Home = () => {
  const { taskList, columns, loading, getTaskList } = useContext(taskContext);

  useEffect(() => {
    getTaskList();
  }, []);

  // return (
  //   <HomeContainer>
  //     <ReactTable
  //       style={{
  //         maxHeight: "800px",
  //       }}
  //       manual
  //       data={taskList}
  //       columns={tableColumns}
  //     />
  //   </HomeContainer>
  // );

  return (
    <HomeContainer>
      <TableContainer
        sx={{
          maxHeight: "80%",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "2px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#111" },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} align="left" style={{ minWidth: 50 }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column];
                    return <TableCell key={column}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </HomeContainer>
  );
};

export default Home;
