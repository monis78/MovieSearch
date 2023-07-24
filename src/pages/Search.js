import React, { useContext } from 'react'
import Navbar from '../component/Navbar/Navbar';
import Card from '../component/MovieCard/Card';
import useGetUserData from '../api-hooks/useGetUserData';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchContext from '../api-hooks/useSearchContext';


const MovieListLayout = ({ children, pageTitle }) => {

  return (
    <>
      <Navbar pageTitle={pageTitle} />
      {children}
    </>
  );
};

const Search = () => {
  const { searchValue } = useContext(SearchContext);

  const { filteredList, otherDetails, error, loading, hasMoreData, fetchAdditionalMovies } =
    useGetUserData(searchValue);

  if (loading) {
    return <MovieListLayout pageTitle={'searching...'}>Loading...</MovieListLayout>;
  }

  if (error.isError) {
    return (
      <>
        <MovieListLayout>Error displaying data,Error message :- {error.message}</MovieListLayout>
      </>
    );
  }

  return (
    <MovieListLayout pageTitle={otherDetails.title}>
      <InfiniteScroll
        dataLength={filteredList.length} //This is important field to render the next data
        next={fetchAdditionalMovies}
        hasMore={hasMoreData}
        loader={loading ? <h4>Loading...</h4> : filteredList.length ? null : <h4>No Data Found</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {filteredList.map(({ name, 'poster-image': posterImage }, index) => {
          return <Card title={name} image={posterImage} key={index} />;
        })}
      </InfiniteScroll>
    </MovieListLayout>
  );
};

export default Search