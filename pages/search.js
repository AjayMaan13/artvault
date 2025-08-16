import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    let queryString = '';
    
    // Add searchBy (required)
    queryString += `${data.searchBy}=true`;
    
    // Add geoLocation if provided
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    
    // Add medium if provided
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    
    // Add isOnView
    queryString += `&isOnView=${data.isOnView}`;
    
    // Add isHighlight
    queryString += `&isHighlight=${data.isHighlight}`;
    
    // Add q (search term)
    queryString += `&q=${data.q}`;
    
    // Add to search history using database
    setSearchHistory(await addToHistory(queryString));
    
    // Navigate to artwork page with query string
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                {...register("q", { required: true })}
                className={errors.q ? "is-invalid" : ""}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist/Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &ldquo;Europe&rdquo;, &ldquo;France&rdquo;, &ldquo;Paris&rdquo;, &ldquo;China&rdquo;, &ldquo;New York&rdquo;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &ldquo;Ceramics&rdquo;, &ldquo;Furniture&rdquo;, &ldquo;Paintings&rdquo;, &ldquo;Sculpture&rdquo;, &ldquo;Textiles&rdquo;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check 
              type="checkbox" 
              label="Highlighted" 
              {...register("isHighlight")}
            />
            <Form.Check 
              type="checkbox" 
              label="Currently on View" 
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AdvancedSearch;