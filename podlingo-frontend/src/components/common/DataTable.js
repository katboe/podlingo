import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
} from '@mui/material';

const DataTable = ({
  title,
  columns,
  data,
  loading,
  renderRow,
  emptyMessage = 'No data found.',
}) => (
  <>
    {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell key={column.id}>
                    <Skeleton animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map(renderRow)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default DataTable; 