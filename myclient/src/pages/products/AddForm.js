import React , {useState}from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from "@material-ui/core/Button";
import { LocalMall, Save } from "@material-ui/icons";
import { Divider, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import "./styles.css"
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ImageUploader from "react-images-upload";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { addProduct} from "../../actions/product.action";
import { connect } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useSnackbar } from "notistack";
import { uploadFile } from 'react-s3';
import { S3config } from "../../components/GlobalParams";


const AddForm = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  let [description, setDescription ] = useState('');
  let [name, setName] = useState('');
  let [brand, setBrand] = useState('');
  let [price, setPrice] = useState(0.00);
  let [stock, setStock] = useState(0);
  let [status, setStatus] = useState(0);
  let [image, setImage] = useState('');
  let [id, setId] = useState('');


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(Number(event.target.value));
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
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

  const uploadImage  = (event)=> {
    if(event && event[0]){
      // console.log(event[0]);
      // console.log(typeof event[0]);
      uploadFile(event[0], S3config)
        .then(data=>{
          setImage(data.location);
        })
        .catch(err =>
          console.error(err)
        )
    }
  };

  const needAdd = () => {
    if(price < 0.01 || price > 9999.99){
      return false;
    }
    return !(stock < 0 || stock > 100000);

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const optionsSnackbar = {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
    };

    if(needAdd()) {
      const newProduct = { id, brand, name, price, status, stock, description, image };
      props.addProduct(newProduct,
        (res)=> {
          if(res.success){
            optionsSnackbar.variant = 'success';
            enqueueSnackbar(res.message, optionsSnackbar);
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
      enqueueSnackbar("Invalid Values here!");
    }
  };

  const handleReset = () => {
      setDescription('');
       setName('');
        setBrand('');
        setPrice(0.00);
        setStock(0);
        setStatus(0);
       setImage('');
       setId('');
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
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={5242880}
            fileSizeError="Image File size is too big"
            errorClass={classes.errorMessage}
            defaultImages={[image]}
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
                <FormControl fullWidth required   error={id === null || id === '' || id < 0 || id > 222222222}>
                  <InputLabel htmlFor="id">Product ID(1-222222222):</InputLabel>
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    min={0}
                    step={1}
                    max={222222222}
                    className={classes.textField}
                    value={id}
                    required
                    onChange={handleIdChange}
                    autoFocus
                  />
                </FormControl>
              </Grid>
              {/*<Grid item>*/}
              {/*  <FormControl fullWidth>*/}
              {/*    <InputLabel htmlFor="categories">Product Categories(readOnly):</InputLabel>*/}
              {/*    <Input*/}
              {/*      id="categories"*/}
              {/*      name="categories"*/}
              {/*      type="text"*/}
              {/*      className={classes.textField}*/}
              {/*      defaultValue={product.categories}*/}
              {/*      inputProps={{*/}
              {/*        readOnly: true*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  </FormControl>*/}
              {/*</Grid>*/}
              <Grid item>
                <FormControl fullWidth required  error={name === null || name ===''}>
                  <InputLabel htmlFor="name">Product Name:</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    error={name === null || name ===''}
                    placeholader="Enter Product Name here..."
                    className={classes.textField}
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth required  error={price === null || price ==='' || price < 0.01 || price > 9999.99}>
                  <InputLabel htmlFor="price">Product Price: <span>(price between 0.01 ~ 9999.99)</span></InputLabel>
                  <Input
                    id="price"
                    error={price === null || price ==='' || price < 0.01 || price > 9999.99}
                    name="price"
                    placeholader="Enter Product Price..."
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
                <FormControl fullWidth required error={stock === null || stock === '' || stock < 0 || stock > 100000}>
                  <InputLabel htmlFor="stock">Product Stock: <span>(0 ~ 100000)</span></InputLabel>
                  <Input
                    error={stock === null || stock === '' || stock < 0 || stock > 100000}
                    id="stock"
                    name="stock"
                    placeholader="Enter Product Stock here..."
                    className={classes.textField}
                    type="number"
                    step={1}
                    min={0}
                    max={100000}
                    value={stock}
                    onChange={handleStockChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth required error={brand === null || brand === ''}>
                    <InputLabel htmlFor="brand">Product Brand:</InputLabel>
                    <Input
                      id="brand"
                      name="brand"
                      type="text"
                      value={brand}
                      placeholder="Enter the brand here..."
                      onChange={handleBrandChange}
                      className={classes.textField}
                    />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth required >
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

              <Divider className={classes.divider2}/>
              <div>
                <Button type="submit" variant="contained" className={classes.submit}>
                  <Save/> Upload
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
export default connect(null,{addProduct})(AddForm);

