import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewProduct({
  handleClickOpenDialog,
  handleCloseDialog,
  openDialog,
  mongoID,
}: props) {
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpenDialog}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h2">{mongoID}</Typography>
        <Typography variant="body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quod ipsum debitis delectus eos maiores esse incidunt ab odit vel, consequatur non voluptas possimus alias repudiandae modi explicabo optio, ea sequi similique quis doloremque neque. Nostrum quos ea blanditiis, sint minus quo quia, ad nesciunt illum quidem unde ratione recusandae, nobis eveniet debitis temporibus quae ut nemo! Ex qui ut eius et, id praesentium sit assumenda consequatur illum quidem provident necessitatibus quasi molestiae aliquam veritatis consectetur dolore hic labore sunt tenetur similique rerum maxime cumque? Voluptas odit blanditiis nesciunt a laboriosam totam voluptatibus ex hic nemo! Quis iste vitae cum est. Sed fugit quis accusantium debitis omnis voluptate et deleniti neque esse aliquid atque aliquam, accusamus unde quisquam harum totam placeat corrupti libero deserunt illo dicta impedit tenetur! Aut neque saepe laudantium sint autem aliquid dicta quisquam temporibus cumque quae iure possimus voluptas voluptate odit, facilis, provident sequi ad sapiente esse quaerat suscipit laboriosam voluptatibus. Rem vel accusamus nulla similique culpa in molestiae eaque, autem natus assumenda, molestias perferendis qui nam, fugit dolor labore dolorum tempore sapiente aliquam saepe reprehenderit odio ab. Impedit, eius a sint incidunt ullam explicabo praesentium fugit quos earum error adipisci iure ipsum magnam veniam necessitatibus? Odio similique, nam reprehenderit nesciunt culpa optio laudantium, doloribus eaque perspiciatis amet praesentium, blanditiis quod rerum. Quo, dolores. Omnis unde expedita adipisci odio ut iure autem, laudantium, harum explicabo aperiam deleniti! Sapiente, vitae nobis optio exercitationem quis saepe consequuntur facere odit voluptates blanditiis dolorem nostrum accusantium modi iusto illo necessitatibus sint. Tempore voluptatem, dolorum corrupti sed dicta tempora hic ipsam vero laborum quam voluptates maxime autem aliquam sunt cumque atque doloribus enim animi et odio eveniet. Iste deserunt voluptatem tempore cumque cum eaque enim optio, nisi veniam exercitationem. Rerum dolor odio aut omnis, saepe deserunt provident a eos corporis error cupiditate distinctio at fugit? Neque, alias corrupti at cupiditate recusandae error! Molestias officiis iste, quaerat repellat fugit facilis vel enim nulla iure nam illum, explicabo necessitatibus impedit accusamus est a dolore. Dignissimos, vel eligendi? Sequi quasi voluptate consequatur et laboriosam impedit facere, dolor accusantium praesentium rerum repellendus harum at adipisci recusandae ducimus assumenda aliquam repudiandae, quidem nemo nihil officia laudantium? Ipsa quidem soluta tenetur quos praesentium repellat, quibusdam est esse hic, sequi molestias maxime, nam rerum odio minima error assumenda nesciunt dicta suscipit? Placeat veniam sunt, dignissimos, error debitis dolorem et nostrum amet voluptatibus voluptates consequatur recusandae atque pariatur tempora commodi reiciendis quibusdam aspernatur natus optio laudantium numquam, aut fugiat! Dolor cupiditate modi neque perferendis. Harum, velit. Hic maiores enim, optio odit pariatur recusandae libero non laudantium cupiditate officia sed eius minima voluptatum obcaecati similique eos ullam id eaque aut vero consectetur aperiam alias modi. Iure laudantium ut sequi, reprehenderit, quam cupiditate autem veniam dolorem vero quidem quasi! Vel earum quia autem ea harum magni, nam minima eius, natus totam ullam facilis iure quae, omnis laboriosam modi voluptatum quasi consequatur eos ipsum! Eum facilis animi voluptatibus similique eaque quae distinctio harum laudantium temporibus sint at repudiandae deleniti quod aliquid fugiat, voluptatum iste velit obcaecati alias. Dolorem, aliquam odio! Quae, esse voluptas saepe nulla excepturi tenetur. Eligendi veniam debitis cum placeat minima porro omnis qui aspernatur consequatur ipsa nulla velit, sed aliquam laborum nemo fuga ipsam voluptates officiis autem error ducimus expedita commodi ab! Soluta natus a nemo molestias dolores explicabo nisi. Est cumque vel nulla eum non id magnam esse modi beatae? Obcaecati recusandae eum adipisci. Sequi debitis exercitationem eum ipsa ducimus quos animi, earum obcaecati magni deserunt labore eveniet laudantium veniam nam tenetur laboriosam. Possimus quas, quo fugit eveniet amet laudantium mollitia eum temporibus recusandae laborum qui tenetur atque magni nesciunt quae ipsa corporis quaerat eos ex alias facilis. Ut illum qui error consequatur blanditiis non mollitia accusantium minus expedita voluptate, nihil aperiam itaque officiis. Nisi dolorum quibusdam ratione temporibus sequi cumque, ex enim, nobis saepe ab, ipsum dignissimos aut rem molestiae reiciendis porro iusto unde alias iste repellendus. Facilis ipsam soluta error et consequuntur ea alias commodi veritatis officia. Odio nesciunt perferendis minus consectetur nostrum praesentium numquam delectus non sapiente necessitatibus consequatur asperiores rem sint excepturi cum a, fugit nihil error ipsum voluptates earum iusto? Ducimus voluptatum expedita inventore quam? Fugiat natus blanditiis reprehenderit sapiente ea fuga sunt sit, facilis voluptatem esse aperiam dicta dolor? Cupiditate quod nemo rem minus, impedit culpa sequi non minima saepe iste libero, corporis facere aliquam voluptatem perferendis velit. Reprehenderit animi ipsa recusandae, illo rerum earum temporibus officiis accusamus aut magni ut illum assumenda amet excepturi non nobis ratione eos, dolorum numquam quasi vitae praesentium in? Ipsa obcaecati officia temporibus! Doloremque alias aut quae odit vitae asperiores laborum perferendis ab harum eos magnam, tempore corporis repellendus quidem quam porro natus esse impedit nam praesentium maxime in accusamus provident. Accusamus optio facere atque expedita molestias quam sequi impedit unde maiores! Tempora voluptatibus in animi officiis inventore unde amet reprehenderit est explicabo dolorum. Ex necessitatibus, placeat, obcaecati maiores numquam error nostrum quisquam illum similique ipsam odio molestias nulla distinctio tempora nemo culpa praesentium! Repellendus vel facere aspernatur aliquid molestias temporibus ullam eveniet magnam vero ipsa, consectetur veritatis possimus assumenda amet voluptates perspiciatis illo nam asperiores numquam! Porro blanditiis fuga exercitationem maxime, omnis saepe earum ex qui magnam, numquam ad, rem soluta eveniet commodi sunt quia vero! Alias dignissimos molestiae dolores quae recusandae, incidunt atque maxime sed quidem doloribus sit quis quisquam excepturi ipsa id modi beatae harum architecto quasi? Quisquam porro, tempore ab magnam est nulla architecto animi error dicta inventore esse assumenda pariatur a quo voluptatibus repudiandae minus aliquid dolore natus! Modi ipsam consequatur iure eos qui culpa autem ea obcaecati enim inventore recusandae omnis, aliquid nulla, maiores voluptatem veritatis, atque voluptas praesentium possimus est. Quisquam quae saepe nisi voluptate dolorem quis vel repellendus ipsam sapiente. Iure iste aliquam, labore commodi ab, veniam exercitationem non aut, in id molestias dolorem vero sapiente assumenda repellat omnis beatae ut dignissimos iusto? Expedita non laboriosam, quasi enim quia voluptas dolorum ab consectetur dolor incidunt, doloremque consequatur? Ex, temporibus inventore animi error quas pariatur distinctio autem expedita reprehenderit!</Typography>
      </Dialog>
    </React.Fragment>
  );
}
