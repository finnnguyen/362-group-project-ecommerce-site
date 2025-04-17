module.exports = ({ env }) => {
  
    return {
      upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            region: env('AWS_REGION'),
            credentials: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_ACCESS_SECRET'),
            },
            params: {
              Bucket: env('AWS_BUCKET'),
            },
            baseUrl: env('AWS_BASE_URL')
          },
        breakpoints: {},
        responsiveDimensions: false,
        },
      },
    };
  };
  