import React , {useState}from 'react'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from "@material-ui/core/Button";
import { Save } from "@material-ui/icons";
import { Divider, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import "./styles.css"
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ImageUploader from "react-images-upload";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { editProduct } from "../../actions/product.action";
import { connect } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useSnackbar } from "notistack";
import { uploadFile } from 'react-s3';
import { S3config } from "../../components/GlobalParams";

//
// deleteFile(filename, config)
//   .then(response => console.log(response))
//   .catch(err => console.error(err))
//
// /**
//  * {
//  *   Response: {
//  *      ok: true,
//           status: 204,
//           message: 'File deleted',
//           fileName: 'hello-world.pdf'
//  *   }
//  * }
//  */

const EditForm = (props) => {
  const classes = useStyles();
  const {product, pristine} = props;
  const { enqueueSnackbar } = useSnackbar();
  let [description, setDescription ] = useState(product.description);
  let [name, setName] = useState(product.name);
  let [price, setPrice] = useState(product.price);
  let [stock, setStock] = useState(product.stock);
  let [status, setStatus] = useState(product.status);
  let [imageFile, setimageFile] = useState(product.image);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(Number(event.target.value));
  };

  const handleStockChange = (event) => {
    setStock(Number(event.target.value));
  };

  const handleStatusChange = (event) => {
    setStatus(Number(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */
  const uploadImage  = (event)=> {
     if(event && event[0]){
       // console.log(event[0]);
       // console.log(typeof event[0]);
        uploadFile(event[0], S3config)
          .then(data=>{
            setimageFile(data.location);

          })
          .catch(err =>
            console.error(err)
          )
    }
  };

  const needUpdate = () => {
    return (name !== product.name || price !== product.price || status !==product.status || stock !== product.stock || description !== product.description);
  };

  const needUpdate1 = () => {
      if(price === null || price < 0.01 || price > 9999.99){
        return false;
      }
    if(stock === null || stock < 0 || stock > 100000){
        return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
      event.preventDefault();
    const optionsSnackbar = {
       variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
    };
    if(needUpdate() && needUpdate1()) {
      const newProduct = {
        id: product.id,
        brand: product.brand,
        categories: product.categories,
        name: name,
        price: price,
        status: status,
        stock: stock,
        image:  imageFile,
        description: description
      };
      props.editProduct(newProduct,
        (res)=> {
             if(res.success){
               optionsSnackbar.variant = 'success';
               enqueueSnackbar(res.message, optionsSnackbar);
               product.image = imageFile;
              props.props.history.push("/home/products/all");
             }else{
               optionsSnackbar.variant = 'error';
               enqueueSnackbar(res.message, optionsSnackbar);
             }

        },
        (err)=> {
          optionsSnackbar.variant = 'error';
          enqueueSnackbar(err.message, optionsSnackbar);
        })
    }else{
      optionsSnackbar.variant = 'error';
      enqueueSnackbar("Nothing changes Or there're invalid value!", optionsSnackbar);
    }
  };

  const handleReset = () => {
     setDescription(product.description);
     setName(product.name);
     setPrice(product.price);
     setStock(product.stock);
     setStatus(product.status);
     setimageFile(product.image);
  };
  return (
    <Card className={classes.card}>
      <Divider variant="middle" className={classes.divider} />
        <Grid container justify="flex-start" size="lg" direction="row" spacing={2}
              alignItems="center">
          <Grid item xs={4}>
            <ImageUploader
              withIcon={true}
              withPreview={true}
              withLabel={false}
              buttonText="Upload Product Images Here"
              onChange = {uploadImage}
              imgExtension={[".jpg",".gif", ".png", ".gif", ".svg"]}
              maxFileSize={5242880}
              fileSizeError="Image File size is too big"
              errorClass={classes.errorMessage}
              defaultImages={[imageFile]}
              singleImage={true}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h6' color="textPrimary" display="block" className={classes.productInfo}>
              Product Information
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="id">Product ID(readOnly):</InputLabel>
                    <Input
                      id="id"
                      name="id"
                      readOnly={true}
                      type="text"
                      className={classes.textField}
                      defaultValue={product.id}
                      autoFocus
                      />
                  </FormControl>
                 </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="categories">Product Categories(readOnly):</InputLabel>
                    <Input
                      id="categories"
                      name="categories"
                      type="text"
                      className={classes.textField}
                      defaultValue={product.categories}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </FormControl>
                </Grid>
               <Grid item>
                <FormControl fullWidth required  error={name === null || name ===''}>
                  <InputLabel htmlFor="name">Product Name:</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholader="Type Product Name"
                    className={classes.textField}
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                  />
                </FormControl>
               </Grid>
                <Grid item>
                  <FormControl fullWidth required  error={price === null || price ==='' || price < 0.01 || price > 9999.99}>
                    <InputLabel htmlFor="price">Product Price: <span>(price between 0.01 ~ 9999.99)</span></InputLabel>
                    <Input
                      id="price"
                      name="price"
                      placeholader="Type Product Price"
                      className={classes.textField}
                      type="number"
                      step={0.01}
                      min={0.01}
                      max={9999.99}
                      value={price}
                      onChange={handlePriceChange}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      required
                    />
                     </FormControl>
                </Grid>
                <Grid item>
                  <FormControl  required fullWidth  error={stock === null || stock === '' || stock < 0|| stock > 100000}>
                    <InputLabel htmlFor="stock">Product Stock: <span>(0 ~ 100000)</span></InputLabel>
                    <Input
                      id="stock"
                      name="stock"
                      placeholader="Type Product Stock"
                      className={classes.textField}
                      type="number"
                      step={1}
                      min={0}
                      max={100000}
                      value={stock}
                      onChange={handleStockChange}
                    />
                   </FormControl>
                </Grid>
              <Grid item>
              <FormControl fullWidth>
                <FormControl fullWidth>
                  <InputLabel htmlFor="brand">Product Brand(readOnly):</InputLabel>
                  <Input
                    id="brand"
                    name="brand"
                    type="text"
                    className={classes.textField}
                    defaultValue={product.brand}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </FormControl>
              </FormControl>
              </Grid>
              <Grid item>
              <FormControl fullWidth required>
                <label className={classes.labelText}>Active Status*: </label>
                <RadioGroup aria-label="active" name="active" onChange={handleStatusChange} value={status.toString()}>
                  <FormControlLabel value="1" control={<Radio color="primary"  className={classes.textField} />} label="Launching" />
                  <FormControlLabel value="0" control={<Radio  color="primary"   className={classes.textField} />} label="Not Available"/>
                </RadioGroup>
              </FormControl>
              </Grid>
                <Grid item>
              <FormControl fullWidth>
                <label className={classes.labelText}>Product Description </label>
                <TextareaAutosize  rows={4} placeholder="Product Description here..." value={description} onChange={handleDescriptionChange} />
              </FormControl>
                </Grid>
                <Grid item>
              <FormControl fullWidth>
                <label className={classes.labelText}>Create At:(readOnly)</label>
                <TextField
                  id="create_timestamp"
                  name="create_timestamp"
                  type="text"
                  defaultValue={product.create_timestamp}
                  className={classes.textField}
                  inputProps={{
                    readOnly: true
                  }}
                />
              </FormControl>
                </Grid>
                <Grid item>
              <FormControl fullWidth>
                <label className={classes.labelText}>Last Modified:(readOnly)</label>
                <TextField
                  id="update_timestamp"
                  name="update_timestamp"
                  type="text"
                  defaultValue={product.create_timestamp}
                  className={classes.textField}
                  inputProps={{
                    readOnly: true
                  }}
                />
              </FormControl>
                </Grid>
              <Divider className={classes.divider2}/>
              <div>
                <Button type="submit" variant="contained" disabled={pristine} className={classes.submit}>
                  <Save/> Update
                </Button>
                <Button type="reset" variant="contained" className={classes.reset} onClick={handleReset}>
                  Reset
                </Button>
              </div>
              </Grid>
            </form>
            </Grid>
        </Grid>
    </Card>
  )
};
export default connect(null,{editProduct})(EditForm);

