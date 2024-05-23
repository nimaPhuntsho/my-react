import { Button, Card, CardBody, Heading, Skeleton } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "./Products";

export interface Items {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

const ReactQuery = () => {
  const URL = "https://dummyjson.com/products";

  const queryClient = useQueryClient();

  const { data, isLoading, error, isPending, isSuccess, status, isFetched } =
    useQuery<Items>({
      queryKey: ["products"],
      queryFn: async (): Promise<Items> => {
        const response = await fetch(URL);
        const jsonResult = await response.json();
        return jsonResult;
      },
    });

  const { mutateAsync, submittedAt } = useMutation({
    mutationFn: async (id: number): Promise<number> => {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("could not delete");
      }

      const result = await response.json();
      return result;
    },
    onSuccess: async (id: number) => {
      console.log(new Date(submittedAt));
      console.log(`${id} deleted successfully`);
    },
    onError: (id: number) => console.log(`${id} failed to deleted`),
  });

  const render = () => {
    return data?.products?.map((element) => (
      <Card key={element.id}>
        <CardBody>
          <Heading size={"md"}>{element.title}</Heading>
          <p> {element.price} </p>
          <Button
            onClick={async () => {
              const result = await mutateAsync(element.id);
              // console.log(result);
            }}
          >
            Remove
          </Button>
        </CardBody>
      </Card>
    ));
  };

  return (
    <>
      <p> {isFetched} </p>

      {isLoading ? "loading ... " : render()}
      {error && "there was an error"}
    </>
  );
};

export default ReactQuery;
