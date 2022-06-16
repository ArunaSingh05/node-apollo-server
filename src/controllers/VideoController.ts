import * as path from 'path';


import { VideoStreamService } from './../services/video-stream.service';
export default class VideoController {
  constructor(private videoStreamService: VideoStreamService) { }
  async getSampleVideo(req: any, res: any, next: any) {
    const filePath = path.resolve('assets/sample-video.mp4');
    res.writeHeader(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': this.videoStreamService.getFileSize(filePath),
    });
    (this.videoStreamService.getSampleVideoStream()).pipe(res);
  }
}