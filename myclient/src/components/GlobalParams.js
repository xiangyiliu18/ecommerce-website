import { createMuiTheme } from "@material-ui/core";

export const BASE_URL = 'http://localhost:8080';

export const useMuiTheme = () => createMuiTheme({
     overrides: {
          MUIDataTableHeadCell: {
               root: {
                    backgroundColor: 'inherit',
                    fontSize: 15,
                    alignItems: 'left',
                    color: 'black'
               }
          },
     }
});

export const S3config = {
     bucketName: 'eworld-app',
     dirName: 'photos',
     region: 'us-east-2',
     accessKeyId: 'AKIAUXZBKXM3QNUM6JAW',
     secretAccessKey: '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',
};

export const noticeOptions = {
     variant: 'error',
     preventDuplicate: true,
     autoHideDuration: 2000,
};
