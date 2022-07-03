const mockResponse = {
  status: () => mockResponse,
  json: (data: any) => data,
};

export default mockResponse;
