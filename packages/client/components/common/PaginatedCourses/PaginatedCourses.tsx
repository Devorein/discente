import { useTheme } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  PaperProps,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { CourseSortableFields, SortOrder } from '@types';
import { useGetCreatedCoursesQuery } from 'api';
import { Button, CustomAvatar, ScrollableStack } from 'components';
import { useState } from 'react';
import CourseSort from './CourseSort';

interface PaginatedCoursesProps extends PaperProps {}

export default function PaginatedCourses({
  sx = {},
  ...props
}: PaginatedCoursesProps) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<CourseSortableFields>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const {
    data: paginatedData,
    isLoading: isPaginatedDataLoading,
    allItems,
    fetchNextPage,
    lastFetchedItem,
    isFetchingNextPage,
    totalItems
  } = useGetCreatedCoursesQuery({
    cursor: null,
    take: itemsPerPage,
    sort: sortField,
    order: sortOrder
  });

  const totalFetchedItems = allItems.length;
  const theme = useTheme();

  if (isPaginatedDataLoading) {
    return <CircularProgress />;
  } else if (paginatedData) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          justifyContent: 'center',
          height: 'calc(100% - 100px)',
          ...sx
        }}
        {...props}
      >
        <Stack gap={1} height='calc(100% - 50px)'>
          <Box
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            display='flex'
            mb={1}
          >
            <Typography variant='h6'>Users</Typography>
            <CourseSort
              onSortFieldChange={async (e) => {
                setSortField(e.target.value as CourseSortableFields);
              }}
              onSortOrderChange={async (e) => {
                setSortOrder(e.target.value as SortOrder);
              }}
              sortOrder={sortOrder}
              sortField={sortField}
            />
            <Typography variant='subtitle1' fontWeight={600}>
              {totalFetchedItems} / {totalItems}
            </Typography>
          </Box>
          <ScrollableStack
            sx={{
              flexGrow: 1
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allItems.map((paginatedCourse) => {
                  let statusColor = theme.palette.text.disabled;
                  const status = paginatedCourse.status;
                  if (status === 'public') {
                    statusColor = theme.palette.success.main;
                  } else if (status === 'banned') {
                    statusColor = theme.palette.error.main;
                  }
                  return (
                    <TableRow key={paginatedCourse.id}>
                      <TableCell>
                        <CustomAvatar
                          avatar={paginatedCourse.instructor.avatar}
                          name={paginatedCourse.instructor.name}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {paginatedCourse.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='subtitle2'>
                          {paginatedCourse.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            color: statusColor
                          }}
                          variant='subtitle2'
                        >
                          {paginatedCourse.status}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: 150
                        }}
                      >
                        <Typography variant='subtitle2'>
                          {new Date(paginatedCourse.updatedAt).toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollableStack>
        </Stack>
        <Stack
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Button
            variant='contained'
            loading={isFetchingNextPage}
            onClick={() => {
              fetchNextPage({
                pageParam: {
                  cursor: lastFetchedItem?.id,
                  take: itemsPerPage,
                  sort: sortField,
                  order: sortOrder
                }
              });
            }}
            disabled={totalFetchedItems === totalItems}
            endIcon={
              !isFetchingNextPage && <ArrowDropDownIcon fontSize='small' />
            }
          >
            Load more
          </Button>
          <Select<number>
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value as number);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Stack>
      </Paper>
    );
  } else {
    return null;
  }
}
