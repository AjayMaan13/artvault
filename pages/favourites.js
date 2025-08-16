import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard';
import { favouritesAtom } from '@/store';

function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;
  if(!favouritesList) return null;

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

export default Favourites;