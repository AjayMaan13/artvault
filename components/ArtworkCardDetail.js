import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Update showAdded state when favouritesList or objectID changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  async function favouritesClicked() {
    if (showAdded) {
      // Remove from favourites
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      // Add to favourites
      setFavouritesList(await addToFavourites(objectID));
    }
  }
  
  return (
    <Card>
      {data.primaryImage && (
        <Card.Img 
          variant="top" 
          src={data.primaryImage} 
        />
      )}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}
          <br /><br />
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"} 
          {data.artistDisplayName && data.artistWikidata_URL && (
            <>
              {" "}( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> )
            </>
          )}
          <br />
          <strong>Credit Line:</strong> {data.creditLine || "N/A"}<br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}
        </Card.Text>
        <Button 
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ArtworkCardDetail;