import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  PaperProps,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { CourseSortableFields } from '@types';
import { useGetCreatedCoursesQuery } from 'api';
import {
  CustomAvatar,
  PaginationLoadMoreButton,
  PaginationSort,
  PaginationSortProps,
  ScrollableStack
} from 'components';
import { useState } from 'react';

interface PaginatedCoursesProps extends PaperProps {}

export default function PaginatedCourses({
  sx = {},
  ...props
}: PaginatedCoursesProps) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortState, setSortState] = useState<
    PaginationSortProps<CourseSortableFields>['sort']
  >({
    field: 'title',
    order: 'asc'
  });

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
    sort: sortState.field,
    order: sortState.order
  });

  const totalFetchedItems = allItems.length;

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
            <Typography variant='h6'>Courses</Typography>
            <PaginationSort<CourseSortableFields>
              onChange={setSortState}
              sort={sortState}
              fields={[
                'title',
                'price',
                'ratings',
                'enrolled',
                'status',
                'updatedAt',
                'createdAt'
              ]}
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
            {allItems.map((paginatedCourse) => {
              return (
                <Paper
                  key={paginatedCourse.id}
                  sx={{
                    p: 3
                  }}
                  elevation={0}
                >
                  <Stack flexDirection='row' gap={2}>
                    <img
                      src={paginatedCourse.image}
                      style={{
                        height: 100,
                        width: 150,
                        objectFit: 'fill'
                      }}
                    />
                    <Grid>
                      <Stack gap={1}>
                        <Typography variant='h6'>
                          {paginatedCourse.title}
                        </Typography>
                        <Typography variant='body2'>
                          {paginatedCourse.description}
                        </Typography>
                        <Stack gap={1} alignItems='center' flexDirection='row'>
                          <CustomAvatar
                            avatar={paginatedCourse.instructor.avatar}
                            name={paginatedCourse.instructor.name}
                          />
                          <Typography variant='subtitle2'>
                            {paginatedCourse.instructor.name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Stack>
                </Paper>
              );
            })}
          </ScrollableStack>
        </Stack>
        <Stack
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <PaginationLoadMoreButton
            loading={isFetchingNextPage}
            onClick={() => {
              fetchNextPage({
                pageParam: {
                  cursor: lastFetchedItem?.id,
                  take: itemsPerPage,
                  sort: sortState.field,
                  order: sortState.order
                }
              });
            }}
            disabled={totalFetchedItems === totalItems}
          />
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
