import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  useEffect(() => {
    if (data) {
      const results = [];
      
      // Check if objectIDs exists and has length
      if (data?.objectIDs?.length > 0) {
        // Filter results to only include valid objectIDs
        let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
        
        // Create paginated chunks from filtered results
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
          const chunk = filteredResults.slice(i, i + PER_PAGE);
          results.push(chunk);
        }
      }
      
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  // Only show error for actual HTTP errors, not "no results found"
  if (error && error.status !== 404) {
    return <Error statusCode={error.status || 500} />;
  }

  if (artworkList) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                  Try searching for something else.
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {artworkList.length > 0 && (
          <Row>
            <Col>
              <br />
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  }

  return null;
}

export default Artwork;